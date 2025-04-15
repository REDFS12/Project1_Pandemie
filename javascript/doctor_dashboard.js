import { db, auth } from './firebaseConfig.js';
import { collection, addDoc, getDocs} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getTotalCases } from './import.js';

const form = document.getElementById('besmetting-form');

// maakt het formulier voor in database te saven
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const woonLocatie = document.getElementById('woonLocatie').value;
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
    
            woonLocatie,
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
