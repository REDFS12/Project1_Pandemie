import { db, auth } from './firebaseConfig.js';
import { collection, addDoc, getDocs} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getTotalCases, getActiveCases } from './import.js';

const form = document.getElementById('besmetting-form');

// maakt het formulier voor in database te saven
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

// haalt de functie van import.js voor meldingen op te tellen
getTotalCases().then(totaal => {
    const totalCasesView = document.getElementById("total_cases");
    if (totalCasesView) {
      totalCasesView.innerText = totaal;
    }
  });
// haalt de functie van import.js voor active case als de datum 
// van genezing nog niet bekend is en telt het open
  getActiveCases().then(active => {
    const activeCasesView = document.getElementById("active_cases");
    if (activeCasesView) {
        activeCasesView.innerText = active;
    }
});

async function drawRegioChart() {
    const regioTelling = {
        'Brussel': 0,
        'Vlaams-Brabant': 0,
        'Waals-Brabant': 0,
        'Antwerpen': 0
    };

    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    snapshot.forEach(doc => {
        const data = doc.data();
        const regio = data.regio;

        if (regioTelling.hasOwnProperty(regio)) {
            regioTelling[regio]++;
        }
    });

    const ctx = document.getElementById('regioChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(regioTelling),
          datasets: [{
            label: 'Aantal meldingen in de regio',
            data: Object.values(regioTelling),
            backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
            borderWidth: 1
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
    };

    drawRegioChart()