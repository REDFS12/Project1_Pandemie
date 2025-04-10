import { db, auth } from './firebaseConfig.js';
import { collection, addDoc, getDocs} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getTotalCases } from './import.js';

const form = document.getElementById('besmetting-form');

// maakt het formulier voor in database te saven
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const regio = document.getElementById('regio').value;
    const leeftijd = parseInt(document.getElementById('leeftijd').value);
    const geslacht = document.getElementById('geslacht').value;
    const virusType = document.getElementById('virus').value;
    const datum = document.getElementById('datum').value;
    const gevaarlijk = document.getElementById('gevaarlijk').value;

    try {
        const user = auth.currentUser;

        await addDoc(collection(db, "Variabelen-geinfecteerden"), {
            regio,
            leeftijd,
            geslacht,
            virusType,
            datum,
            gevaarlijk,
            dokterId: user.uid,
        });

        form.reset();
    } catch (err) {
        console.error("Fout bij opslaan:", err);
    }
});

// telt op hoeveel formulier werd ingevuld en kan dan weten hoeveel zieken(cases) er zijn.
getTotalCases().then(totaal => {
    const totalCasesView = document.getElementById("total_cases");
    if (totalCasesView) {
      totalCasesView.innerText = totaal;
    }
  });
