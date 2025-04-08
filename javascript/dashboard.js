import { auth, db } from './firebaseConfig.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const loginForm = document.getElementById('login-form');
const loginEmailField = document.getElementById('login-email');
const loginPasswordField = document.getElementById('login-password');


const getSelectedRole = () => {
    const roleElements = document.getElementsByName('role');
    for (let element of roleElements) {
        if (element.checked) {
            return element.value;  // Retourneert de geselecteerde rol (dokter of gebruikers)
        }
    }
    return null;
};

// Verwerk inlogformulier
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();  

    const email = loginEmailField.value;
    const password = loginPasswordField.value;
    const role = getSelectedRole();  // Haal de geselecteerde rol op

    try {
        // Login met Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log('User logged in:', user);

        // Verkrijg de rol van de gebruiker uit de Firestore-database
        const collectionName = role === "dokter" ? "dokters" : "gebruikers";
        const docRef = doc(db, collectionName, user.uid);
        const docSnap = await getDoc(docRef);


        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userRole = userData.rol;

            console.log('User role from Firestore:', userRole);

            // Controleer of de geselecteerde rol overeenkomt met de rol in Firestore
            if (role === userRole) {
            
                window.location.href = role === "dokter" ? '/html/doctor_dashboard.html' : '/html/user_dashboard.html';
            } else {
                alert('De geselecteerde rol komt niet overeen met de gegevens in onze database.');
            }
        } else {
            console.error('Geen gebruikersdocument gevonden in Firestore');
            alert('Geen gebruikersgegevens gevonden voor deze rol.');
        }

    } catch (error) {
        console.error('Error during login:', error.code, error.message);
        alert('Geen login teruggevonden in de data: ' + error.message);
    }
});
