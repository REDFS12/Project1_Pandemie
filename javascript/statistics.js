import { db } from './firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Functie om gegevens op te halen van Firestore
async function getStatisticsData() {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    const dataPerRegio = {
        'Brussel': { cases: 0, active: 0, recovered: 0 },
        'Vlaams-Brabant': { cases: 0, active: 0, recovered: 0 },
        'Antwerpen': { cases: 0, active: 0, recovered: 0 }
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
                    label: 'Totaal Gevallen',
                    data: casesData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
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

// Functie voor filteren
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
});

// Initialiseer de pagina bij het laden
window.addEventListener('DOMContentLoaded', async () => {
    const dataPerRegio = await getStatisticsData();
    updateStatisticsTable(dataPerRegio);
    updateChart(dataPerRegio);
});
