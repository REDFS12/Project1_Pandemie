import { auth, db } from './firebaseConfig.js';
import {signInWithEmailAndPassword, setPersistence, browserLocalPersistence, signOut} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
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
      if (!userData.approved) {
        alert('Your account is not approved yet. Please wait for admin approval.');
        await signOut(auth); // <-- Add this line here
        return;
      }

      const userRole = userData.rol;

      console.log('User role from Firestore:', userRole);

      if (userRole === "dokter") {
        const lang = localStorage.getItem('selectedLanguage') || 'en';
        let dashboardUrl = '/html/doctor_dashboardEN.html';
        if (lang === 'nl') dashboardUrl = '/html/doctor_dashboardNL.html';
        else if (lang === 'fr') dashboardUrl = '/html/doctor_dashboardFR.html';
        else if (lang === 'de') dashboardUrl = '/html/doctor_dashboardDE.html';
        window.location.href = dashboardUrl;
      } else {
        alert('Unknown role in Firestore.');
      }
    }

  } catch (error) {
    console.error('Error during login:', error.code, error.message);
    alert('Login failed. Check your email address or password.');

  }
});

// localStorage for language choice
document.querySelectorAll('.language-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const lang = button.getAttribute('data-lang');
    localStorage.setItem('selectedLanguage', lang);
    switchLanguage(lang);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('selectedLanguage') || 'en';
  switchLanguage(lang); // Make sure switchLanguage is defined on this page
});
