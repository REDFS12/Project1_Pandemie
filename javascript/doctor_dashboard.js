import { db, auth } from './firebaseConfig.js';
import { collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getTotalCases, getActiveCases, getRecoveredCases, getDeathsCases } from './import.js';

// Form handling
const form = document.getElementById('besmetting-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const region = document.getElementById('regio').value;
    const workLocation = document.getElementById('werkLocatie').value;
    const age = parseInt(document.getElementById('leeftijd').value);
    const householdSize = parseInt(document.getElementById('gezinGrootte').value);
    const gender = document.getElementById('geslacht').value;
    const virusType = document.getElementById('virusType').value;
    const infectionDate = document.getElementById('datumBesmetting').value;
    const entryDate = document.getElementById('ingaveDatum').value;
    const recoveryDate = document.getElementById('genezingDatum').value;
    const vaccinationStatus = document.getElementById('statusVaccinatie').value;

    try {
        const user = auth.currentUser;

        await addDoc(collection(db, "Variabelen-geinfecteerden"), {
            region,
            workLocation,
            age,
            householdSize,
            gender,
            virusType,
            infectionDate,
            entryDate,
            recoveryDate,
            vaccinationStatus,
            doctorId: user.email,
        });

        form.reset();
    } catch (err) {
        console.error("Error saving:", err);
    }
});

// Update statistics
getTotalCases().then(total => {
    document.getElementById("total_cases").innerText = total;
});

getActiveCases().then(active => {
    document.getElementById("aantal_actieve").innerText = active;
});

getRecoveredCases().then(recovered => {
    document.getElementById("aantal_hersteld").innerText = recovered;
});

getDeathsCases().then(death => {
    document.getElementById("aantal_overleden").innerText = death
})

// Region chart
async function drawRegionChart() {
    let activeCases = 0;
    let recoveredCases = 0;
    let deathCases = 0;

    const regionCount = {
        'Brussel': 0,
        'Vlaams-Brabant': 0,
        'Antwerpen': 0
    };

    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    snapshot.forEach(doc => {
        const data = doc.data();
        const region = data.regio;

        if (regionCount.hasOwnProperty(region)) {
            regionCount[region]++;
        }

        if (!data.genezingDatum || new Date(data.genezingDatum) > new Date()) {
            activeCases++;
        }

        if (data.genezingDatum) {
            recoveredCases++;
        }

        if (data.gestorven == true) {
            deathCases++;
        }
    });

    // Show statistics in HTML 
    const active = document.getElementById("aantal_actieve");
    const recovered = document.getElementById("aantal_hersteld");
    const death = document.getElementById("aantal_overleden");

    if (active) active.innerText = activeCases;
    if (recovered) recovered.innerText = recoveredCases;
    if (death) death.innerText = deathCases;

    // Draw region-based chart
    const ctx = document.getElementById('regioChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(regionCount),
            datasets: [{
                label: 'Number of reports in the region',
                data: Object.values(regionCount),
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

drawRegionChart();

// localStorage
document.querySelectorAll('.language-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        localStorage.setItem('selectedLanguage', lang); // Save the selected language
        switchLanguage(lang); // Update the content dynamically
    });
});