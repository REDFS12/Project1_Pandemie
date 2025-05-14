import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Gebruiker is NIET ingelogd → stuurt naar login
    window.location.href = '/html/login.html';
  } else {
    console.log("Gebruiker is ingelogd:", user.email);
  }
});
