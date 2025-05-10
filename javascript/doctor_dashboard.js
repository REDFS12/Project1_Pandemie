import { db, auth } from './firebaseConfig.js';
import { collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getTotalCases, getActiveCases, getRecoveredCases, getDeathsCases } from './import.js';

// Formulierverwerking
const form = document.getElementById('besmetting-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const regio = document.getElementById('regio').value;
    const werkLocatie = document.getElementById('werkLocatie').value;
    const leeftijd = parseInt(document.getElementById('leeftijd').value);
    const gezinGrootte = parseInt(document.getElementById('gezinGrootte').value);
    const geslacht = document.getElementById('geslacht').value;
    const virusType = document.getElementById('virusType').value;
    const datumBesmetting = document.getElementById('datumBesmetting').value;
    const ingaveDatum = document.getElementById('ingaveDatum').value;
    const genezingDatum = document.getElementById('genezingDatum').value;
    const statusVaccinatie = document.getElementById('statusVaccinatie').value;

    try {
        const user = auth.currentUser;

        await addDoc(collection(db, "Variabelen-geinfecteerden"), {
            regio,
            werkLocatie,
            leeftijd,
            gezinGrootte,
            geslacht,
            virusType,
            datumBesmetting,
            ingaveDatum,
            genezingDatum,
            statusVaccinatie,
            dokterId: user.email,
        });

        form.reset();
    } catch (err) {
        console.error("Fout bij opslaan:", err);
    }
});

// Statistieken bijwerken
getTotalCases().then(total => {
    document.getElementById("total_cases").innerText = total;
});

getActiveCases().then(active => {
    document.getElementById("active_cases").innerText = active;
});

getRecoveredCases().then(recovered => {
    document.getElementById("recovered_cases").innerText = recovered;
});

getDeathsCases().then(death => {
    document.getElementById("death_cases").innerText = death
})

// Regio-grafiek
async function drawRegioChart() {
    let actieveGevallen = 0;
    let hersteldeGevallen = 0;

    const regioTelling = {
        'Brussel': 0,
        'Vlaams-Brabant': 0,
        'Antwerpen': 0
    };

    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    snapshot.forEach(doc => {
        const data = doc.data();
        const regio = data.regio;

        if (regioTelling.hasOwnProperty(regio)) {
            regioTelling[regio]++;
        }

        if (!data.genezingDatum) {
            actieveGevallen++;
        }

        if (data.genezingDatum) {
            hersteldeGevallen++;
        }
    });

    // Toon statistieken in HTML 
    const actief = document.getElementById("aantal_actieve");
    const hersteld = document.getElementById("aantal_hersteld");

    if (actief) actief.innerText = actieveGevallen;
    if (hersteld) hersteld.innerText = hersteldeGevallen;

    // Regiogebaseerde grafiek tekenen
    const ctx = document.getElementById('regioChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(regioTelling),
            datasets: [{
                label: 'Aantal meldingen in de regio',
                data: Object.values(regioTelling),
                backgroundColor: ['#3b82f6', '#f97316', '#facc15'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
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

drawRegioChart();

// localStorage
document.querySelectorAll('.language-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        localStorage.setItem('selectedLanguage', lang); // Save the selected language
        switchLanguage(lang); // Update the content dynamically
    });
});