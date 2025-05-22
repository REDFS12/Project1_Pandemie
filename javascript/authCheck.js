import { auth } from './firebaseConfig.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const authButton = document.getElementById('auth-button');

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Logged in → Show "Sign out"
    authButton.innerHTML = `<a href="#" id="logout-link">Sign out</a>`;
    
    document.getElementById('logout-link').addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        window.location.href = '/html/loginEN.html'; // redirect after logging out
      } catch (err) {
        console.error("Error during sign out:", err);
      }
    });

  } else {
    // Not logged in → Show "Sign in"
    authButton.innerHTML = `<a href="/html/loginEN.html">Sign in</a>`;
  }
});

