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
    const rol = roleSelect.value; 



    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Stop direct als userCredential niet bestaat
        if (!userCredential || !userCredential.user) {
            throw new Error("Registratie mislukt. Probeer opnieuw.");
        }
    
        const user = userCredential.user;
    
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
        console.error("Error tijdens registratie:", error);
    
        if (error.code === 'auth/email-already-in-use') {
            alert('Dit e-mailadres is al geregistreerd. Log in of gebruik een ander e-mailadres.');
        } else {
            alert('Fout bij registratie: ' + error.message);
        }
    
    
        return;
    }
    
});
