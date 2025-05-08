import { db } from './firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Functie om gegevens op te halen van Firestore
async function getStatisticsData() {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    const dataPerRegio = {
        'Brussel': { cases: 0, active: 0, recovered: 0, death: 0, leeftijden: [], virusTypes: {} },
        'Vlaams-Brabant': { cases: 0, active: 0, recovered: 0, death: 0, leeftijden: [], virusTypes: {} },
        'Antwerpen': { cases: 0, active: 0, recovered: 0, death: 0, leeftijden: [], virusTypes: {} }
    };

    snapshot.forEach(doc => {
        const data = doc.data();
        const regio = data.regio;
        const isActive = !data.genezingDatum;
        const isRecovered = !!data.genezingDatum;
        const isDeath = data.gestorven;


        if (dataPerRegio.hasOwnProperty(regio)) {
            dataPerRegio[regio].cases++;
            if (isActive) dataPerRegio[regio].active++;
            if (isRecovered) dataPerRegio[regio].recovered++;
            if(isDeath) dataPerRegio[regio].death++;

            if (data.leeftijd) {
                dataPerRegio[regio].leeftijden.push(data.leeftijd);
            }

            if (data.virusType) {
                const vt = data.virusType;
                if (!dataPerRegio[regio].virusTypes[vt]) {
                    dataPerRegio[regio].virusTypes[vt] = 0;
                }
                dataPerRegio[regio].virusTypes[vt]++;
            }
        }
    });

    return dataPerRegio;
}

// Tabel updaten
function updateStatisticsTable(dataPerRegio) {
    const tableBody = document.querySelector('#statistics-table tbody');
    tableBody.innerHTML = '';

    Object.keys(dataPerRegio).forEach(regio => {
        const data = dataPerRegio[regio];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${regio}</td>
            <td>${data.cases}</td>
            <td>${data.active}</td>
            <td>${data.recovered}</td>
            <td>${data.death}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Grafiek met totale, actieve en herstelde gevallen
function updateChart(dataPerRegio) {
    const ctx = document.getElementById('statisticsChart').getContext('2d');
    const labels = Object.keys(dataPerRegio);
    const casesData = labels.map(regio => dataPerRegio[regio].cases);
    const activeData = labels.map(regio => dataPerRegio[regio].active);
    const recoveredData = labels.map(regio => dataPerRegio[regio].recovered);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Totale Gevallen',
                    data: casesData,
                    backgroundColor: 'blue',
                    borderColor: 'darkblue',
                    borderWidth: 1
                },
                {
                    label: 'Actieve Gevallen',
                    data: activeData,
                    backgroundColor: 'red',
                    borderColor: 'darkred',
                    borderWidth: 1
                },
                {
                    label: 'Herstelde Gevallen',
                    data: recoveredData,
                    backgroundColor: 'lightgreen',
                    borderColor: 'green',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}

// Regio-filterknop
document.getElementById('filter-knop').addEventListener('click', async () => {
    const selectedRegio = document.getElementById('filter-regio').value;
    const dataPerRegio = await getStatisticsData();

    if (selectedRegio !== 'all') {
        Object.keys(dataPerRegio).forEach(regio => {
            if (regio !== selectedRegio) {
                delete dataPerRegio[regio];
            }
        });
    }

    updateStatisticsTable(dataPerRegio);
    updateChart(dataPerRegio);
    updateLeeftijdChart(dataPerRegio);
    updateVirusTypeChart(dataPerRegio);
});

// Gemiddelde leeftijden grafiek
function updateLeeftijdChart(dataPerRegio) {
    const ctx = document.getElementById('leeftijdChart').getContext('2d');
    const labels = Object.keys(dataPerRegio);

    const gemiddeldeLeeftijden = labels.map(regio => {
        const leeftijden = dataPerRegio[regio].leeftijden;
        const som = leeftijden.reduce((a, b) => a + b, 0);
        return leeftijden.length ? (som / leeftijden.length).toFixed(1) : 0;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gemiddelde Leeftijd per regio',
                data: gemiddeldeLeeftijden,
                backgroundColor: 'orange'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 5 }
                }
            }
        }
    });
}

// Virus type per regio grafiek
function updateVirusTypeChart(dataPerRegio) {
    const ctx = document.getElementById('virusChart').getContext('2d');
    
    const virusTypes = ['Covid', 'Grippe', 'Malaria'];
    const regioNamen = Object.keys(dataPerRegio);

    const regioKleuren = {
        'Brussel': 'blue',
        'Vlaams-Brabant': 'orange',  
        'Antwerpen': 'green'        
    };

    const datasets = regioNamen.map(regio => ({
        label: regio,
        data: virusTypes.map(virus => dataPerRegio[regio].virusTypes[virus] || 0),
        backgroundColor: regioKleuren[regio] || '#95a5a6'
    }));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: virusTypes,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Aantal meldingen per Virus Type en Regio'
                }
            },
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}

// Initialisatie
window.addEventListener('DOMContentLoaded', async () => {
    const dataPerRegio = await getStatisticsData();
    updateStatisticsTable(dataPerRegio);
    updateChart(dataPerRegio);
    updateLeeftijdChart(dataPerRegio);
    updateVirusTypeChart(dataPerRegio);
});
