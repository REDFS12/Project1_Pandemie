import { auth, db } from './firebaseConfig.js';
import {signInWithEmailAndPassword, setPersistence, browserLocalPersistence
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const loginForm = document.getElementById('login-form');
const loginEmailField = document.getElementById('login-email');
const loginPasswordField = document.getElementById('login-password');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = loginEmailField.value;
  const password = loginPasswordField.value;

  try {
    // Persistentie instellen
    await setPersistence(auth, browserLocalPersistence);

    // Login met Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('User logged in:', user);

    // Firestore-document ophalen (rol)
    const docRef = doc(db, "dokters", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const userRole = userData.rol;

      console.log('User role from Firestore:', userRole);

      
      if (userRole === "dokter") {
        window.location.href = '/html/doctor_dashboard.html';
      } else {
        alert('Onbekende rol in Firestore.');
      }
    }

  } catch (error) {
    console.error('Error during login:', error.code, error.message);
    alert('Login mislukt. Controleer je e-mailadres of wachtwoord.');

  }
});

// localStorage voor taalkeuze
document.querySelectorAll('.language-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const lang = button.getAttribute('data-lang');
    localStorage.setItem('selectedLanguage', lang);
    switchLanguage(lang);
  });
});
