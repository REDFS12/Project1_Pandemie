import { db, auth } from './firebaseConfig.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const form = document.getElementById('besmetting-form');

// Verwerk het formulier
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

        await addDoc(collection(db, "besmettingen"), {
            regio,
            leeftijd,
            geslacht,
            virusType,
            datum,
            gevaarlijk,
            dokterId: user.uid,
            // timestamp: new Date()
        });

        form.reset();
    } catch (err) {
        console.error("Fout bij opslaan:", err);
        feedback.innerText = "Er is iets misgegaan bij het opslaan.";
    }
});
