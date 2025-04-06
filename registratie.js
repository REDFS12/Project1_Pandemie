import { auth, db } from './firebaseConfig.js';  
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { collection, addDoc, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Verkrijg formulier en velden
const registerForm = document.getElementById('register-form');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const roleSelect = document.getElementById('role'); // Haal de select op

// Verwerk registratie
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();  

    const email = emailField.value;
    const password = passwordField.value;
    const rol = roleSelect.value; // Haal de gekozen rol op

    console.log("Geselecteerde rol:", rol); // Debugging om te zien of de juiste rol wordt opgehaald

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User registered:', user);

        // Voeg gebruiker toe aan Firestore database
        await setDoc(doc(db, "gebruikers", user.uid), {
            uid: user.uid,
            email: email,
            rol: rol
        });

        // Redirect op basis van rol
        window.location.href = rol === "dokter" ? '/html/dokter_dashboard.html' : '/html/login.html';

    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('Dit e-mailadres is al geregistreerd. Probeer in te loggen of gebruik een ander e-mailadres.');
        } else {
            console.error('Error during registration:', error.code, error.message);
            alert('Fout: ' + error.message);
        }
    }
});
