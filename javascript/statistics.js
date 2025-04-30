import { db } from './firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Functie om gegevens op te halen van Firestore
async function getStatisticsData() {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    const dataPerRegio = {
        'Brussel': { cases: 0, active: 0, recovered: 0, leeftijden: [], virusTypes: {} },
        'Vlaams-Brabant': { cases: 0, active: 0, recovered: 0, leeftijden: [], virusTypes: {} },
        'Antwerpen': { cases: 0, active: 0, recovered: 0, leeftijden: [], virusTypes: {} }
    };

    snapshot.forEach(doc => {
        const data = doc.data();
        const regio = data.regio;
        const isActive = !data.genezingDatum;
        const isRecovered = !!data.genezingDatum;

        if (dataPerRegio.hasOwnProperty(regio)) {
            dataPerRegio[regio].cases++;
            if (isActive) dataPerRegio[regio].active++;
            if (isRecovered) dataPerRegio[regio].recovered++;
        
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

// Functie om de tabel bij te werken
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
        `;
        tableBody.appendChild(row);
    });
}

// Functie om de grafiek bij te werken
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
                    label: 'Actieve gevallen',
                    data: activeData,
                    backgroundColor: 'red',
                    borderColor: 'darkred',
                    borderWidth: 1
                },
                {
                    label: 'Herstelde gevallen',
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
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Functie voor het filteren van regio's
document.getElementById('filter-knop').addEventListener('click', async () => {
    const selectedRegio = document.getElementById('filter-regio').value;
    const dataPerRegio = await getStatisticsData();

    // Filter de data op regio als "all" is geselecteerd, worden alle regio's getoond
    if (selectedRegio !== 'all') {
        Object.keys(dataPerRegio).forEach(regio => {
            if (regio !== selectedRegio) {
                delete dataPerRegio[regio];
            }
        });
    }

    updateStatisticsTable(dataPerRegio);
    updateChart(dataPerRegio);
    updateLeeftijdChart(dataPerRegio); // Herupdate de leeftijd grafiek
    updateVirusTypeChart(dataPerRegio); // Herupdate de virus type grafiek
});

// Functie voor het berekenen en tonen van de gemiddelde leeftijd per regio in grafiek
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
                label: 'Gemiddelde Leeftijd',
                data: gemiddeldeLeeftijden,
                backgroundColor: 'orange'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    });
}

// Functie voor het tonen van virus types per regio in grafiek
function updateVirusTypeChart(dataPerRegio) {
    const ctx = document.getElementById('virusChart').getContext('2d');
    const regioNamen = Object.keys(dataPerRegio);

    const alleVirusTypes = new Set();
    regioNamen.forEach(regio => {
        Object.keys(dataPerRegio[regio].virusTypes).forEach(type => {
            alleVirusTypes.add(type);
        });
    });

    const virusTypesArray = Array.from(alleVirusTypes);
    const kleuren = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6'];

    const datasets = virusTypesArray.map((virusType, i) => ({
        label: virusType,
        data: regioNamen.map(regio => dataPerRegio[regio].virusTypes[virusType] || 0),
        backgroundColor: kleuren[i % kleuren.length]
    }));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: regioNamen,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Virus Type per Regio'
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Initialiseren van de grafieken bij het laden van de pagina
window.addEventListener('DOMContentLoaded', async () => {
    const dataPerRegio = await getStatisticsData();
    updateStatisticsTable(dataPerRegio);
    updateChart(dataPerRegio);
    updateLeeftijdChart(dataPerRegio);
    updateVirusTypeChart(dataPerRegio);
});
