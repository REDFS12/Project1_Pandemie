import { db, auth } from './firebaseConfig.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const form = document.getElementById('besmetting-form');
const feedback = document.getElementById('feedback');

// Controleer of de gebruiker is ingelogd en een dokter is
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        alert("Je moet ingelogd zijn als dokter om deze pagina te bekijken.");
        window.location.href = "/html/login.html";
        return;
    }
});

// Verwerk het formulier
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const regio = document.getElementById('regio').value;
    const leeftijd = parseInt(document.getElementById('leeftijd').value);
    const geslacht = document.getElementById('geslacht').value;
    const virusType = document.getElementById('virus-type').value;
    const datum = document.getElementById('datum').value;
    const hersteld = document.getElementById('hersteld').checked;
    const gevaarlijk = document.getElementById('gevaarlijk').value;

    try {
        const user = auth.currentUser;

        await addDoc(collection(db, "besmettingen"), {
            regio,
            leeftijd,
            geslacht,
            virusType,
            datum,
            hersteld,
            gevaarlijk,
            dokterId: user.uid,
            // timestamp: new Date()
        });

        feedback.innerText = "✅ Besmetting succesvol toegevoegd.";
        form.reset();
    } catch (err) {
        console.error("❌ Fout bij opslaan:", err);
        feedback.innerText = "Er is iets misgegaan bij het opslaan.";
    }
});
