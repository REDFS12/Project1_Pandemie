import { auth, db } from './firebaseConfig.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const authButton = document.getElementById('auth-button');

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Fetch user document
    const docRef = doc(db, "dokters", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists() || !docSnap.data().approved) {
      alert('Your account is not approved yet. Please wait for admin approval.');
      await auth.signOut();
      window.location.href = '/html/loginEN.html';
      return;
    }

    // Logged in → Show "Sign out" en nieuwe meldingen
    authButton.innerHTML = 
                          `<a href="/html/doctor_dashboardNL.html">Dashboard</a>
                           <span style="margin-left: 100px;">
                           <a href="#" id="logout-link">Sign out</a>
                           </span>`;
                          
    
    
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

