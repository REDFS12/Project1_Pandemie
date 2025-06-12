import { db } from './firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Function to fetch data from Firestore
async function getStatisticsData() {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    const dataPerRegion = {
        'Brussel': { cases: 0, active: 0, recovered: 0, death: 0, ages: [], virusTypes: {} },
        'Vlaams-Brabant': { cases: 0, active: 0, recovered: 0, death: 0, ages: [], virusTypes: {} },
        'Antwerpen': { cases: 0, active: 0, recovered: 0, death: 0, ages: [], virusTypes: {} }
    };

    snapshot.forEach(doc => {
        const data = doc.data();
        const region = data.region;
        const isActive = !data.recoveryDate;
        const isRecovered = !!data.recoveryDate;
        const isDeath = data.gestorven === true;

        if (dataPerRegion.hasOwnProperty(region)) {
            dataPerRegion[region].cases++;
            if (isActive) dataPerRegion[region].active++;
            if (isRecovered) dataPerRegion[region].recovered++;
            if (isDeath) dataPerRegion[region].death++;

            if (data.age) {
                dataPerRegion[region].ages.push(data.age);
            }

            if (data.virusType) {
                const vt = data.virusType;
                if (!dataPerRegion[region].virusTypes[vt]) {
                    dataPerRegion[region].virusTypes[vt] = 0;
                }
                dataPerRegion[region].virusTypes[vt]++;
            }
        }
    });

    return dataPerRegion;
}

// Update table
function updateStatisticsTable(dataPerRegion) {
    const tableBody = document.querySelector('#statistics-table tbody');
    tableBody.innerHTML = '';

    Object.keys(dataPerRegion).forEach(region => {
        const data = dataPerRegion[region];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${region}</td>
            <td>${data.cases}</td>
            <td>${data.active}</td>
            <td>${data.recovered}</td>
            <td>${data.death}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Grafiek met totale, actieve en herstelde gevallen
function updateChart(dataPerRegion) {
    const ctx = document.getElementById('statisticsChart').getContext('2d');
    const labels = Object.keys(dataPerRegion);
    const casesData = labels.map(region => dataPerRegion[region].cases);
    const activeData = labels.map(region => dataPerRegion[region].active);
    const recoveredData = labels.map(region => dataPerRegion[region].recovered);
    const deathData = labels.map(region => dataPerRegion[region].death);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Cases',
                    data: casesData,
                    backgroundColor: 'blue',
                    borderColor: 'darkblue',
                    borderWidth: 1
                },
                {
                    label: 'Active Cases',
                    data: activeData,
                    backgroundColor: 'red',
                    borderColor: 'darkred',
                    borderWidth: 1
                },
                {
                    label: 'Recovered Cases',
                    data: recoveredData,
                    backgroundColor: 'lightgreen',
                    borderColor: 'green',
                    borderWidth: 1
                },

                {
                    label: 'Deaths',
                    data: deathData,
                    backgroundColor: 'black',
                    borderColor: 'grey',
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
    const dataPerRegion = await getStatisticsData();

    if (selectedRegio !== 'all') {
        Object.keys(dataPerRegion).forEach(region => {
            if (region !== selectedRegio) {
                delete dataPerRegion[region];
            }
        });
    }

    updateStatisticsTable(dataPerRegion);
    updateChart(dataPerRegion);
    updateLeeftijdChart(dataPerRegion);
    updateVirusTypeChart(dataPerRegion);
});

// Gemiddelde leeftijden grafiek
function updateLeeftijdChart(dataPerRegion) {
    const ctx = document.getElementById('leeftijdChart').getContext('2d');
    const labels = Object.keys(dataPerRegion);

    const gemiddeldeLeeftijden = labels.map(region => {
        const leeftijden = dataPerRegion[region].ages;
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
function updateVirusTypeChart(dataPerRegion) {
    const ctx = document.getElementById('virusChart').getContext('2d');
    
    const virusTypes = ['Covid', 'Grippe', 'Malaria'];
    const regioNamen = Object.keys(dataPerRegion);

    const regioKleuren = {
        'Brussel': 'blue',
        'Vlaams-Brabant': 'orange',  
        'Antwerpen': 'green'        
    };

    const datasets = regioNamen.map(region => ({
        label: region,
        data: virusTypes.map(virus => dataPerRegion[region].virusTypes[virus] || 0),
        backgroundColor: regioKleuren[region] || '#95a5a6'
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
    const dataPerRegion = await getStatisticsData();
    updateStatisticsTable(dataPerRegion);
    updateChart(dataPerRegion);
    updateLeeftijdChart(dataPerRegion);
    updateVirusTypeChart(dataPerRegion);
});

// localStorage
document.querySelectorAll('.language-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        localStorage.setItem('selectedLanguage', lang); // Save the selected language
        switchLanguage(lang); // Update the content dynamically
    });
});