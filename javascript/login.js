import { auth, db } from './firebaseConfig.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const loginForm = document.getElementById('login-form');
const loginEmailField = document.getElementById('login-email');
const loginPasswordField = document.getElementById('login-password');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();  

    const email = loginEmailField.value;
    const password = loginPasswordField.value;

    try {
        // Login met Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log('User logged in:', user);

        // Verkrijg het gebruikersdocument uit Firestore op basis van de UID
        const docRef = doc(db, "dokters", user.uid);  
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userRole = userData.rol;

            console.log('User role from Firestore:', userRole);

            // Stuurt naar dashboard op basis van de rol in Firestore
            if (userRole === "dokter") {
                window.location.href = '/html/doctor_dashboard.html';
            } else if (userRole === "gebruikers") {
                window.location.href = '/html/user_dashboard.html';
            } else {
                alert('Onbekende rol in Firestore.');
            }
        }

    } catch (error) {
        console.error('Error during login:', error.code, error.message);
        alert('Geen login teruggevonden in de data: ' + error.message);
    }
});


// localStorage
document.querySelectorAll('.language-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        localStorage.setItem('selectedLanguage', lang); // Save the selected language
        switchLanguage(lang); // Update the content dynamically
    });
});