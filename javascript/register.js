import { auth, db } from './firebaseConfig.js';  
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';


const registerForm = document.getElementById('register-form');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const roleSelect = document.getElementById('user-role');

// Verwerk registratie
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();  

    const email = emailField.value;
    const password = passwordField.value;
    const rol = roleSelect.value; // Haal de gekozen rol op



    try {
        // Maak nieuwe gebruiker aan via Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Wacht tot Firebase de user herkent 
        await new Promise(resolve => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    unsubscribe();
                    resolve();
                }
            });
        });

        const user = auth.currentUser;
        console.log('User is ingelogd en herkend:', user);

        // Schrijf naar juiste Firestore collectie
        const collectionName = rol === "dokter" ? "dokters" : "gebruikers";
        await setDoc(doc(db, collectionName, user.uid), {
            uid: user.uid,
            email: email,
            rol: rol
        });

        
        window.location.href = rol === "dokter"
            ? '/html/doctor_dashboard.html'
            : '/html/dashboard.html';

    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('Dit e-mailadres is al geregistreerd. Probeer in te loggen of gebruik een ander e-mailadres.');
        } else {
            console.error('Error tijdens registratie:', error.code, error.message);
            alert('Fout: ' + error.message);
        }
    }
});
