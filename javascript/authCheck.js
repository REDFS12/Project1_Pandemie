
import { auth } from './firebaseConfig.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const authButton = document.getElementById('auth-button');

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Ingelogd → Toon "Log uit"
    authButton.innerHTML = `<a href="#" id="logout-link">Log uit</a>`;
    
    document.getElementById('logout-link').addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        window.location.href = '/html/login.html'; // redirect na uitloggen
      } catch (err) {
        console.error("Fout bij uitloggen:", err);
      }
    });

  } else {
    // Niet ingelogd → Toon "Inloggen"
    authButton.innerHTML = `<a href="/html/login.html">Sign in</a>`;
  }
});

