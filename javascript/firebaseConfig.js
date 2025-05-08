import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, setPersistence, browserLocalPersistence } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDleTLn1fyEZUvv08_40fwr-EMn_2xoi-o",
  authDomain: "project-pandemie.firebaseapp.com",
  projectId: "project-pandemie",
  storageBucket: "project-pandemie.firebasestorage.app",
  messagingSenderId: "977307066282",
  appId: "1:977307066282:web:45d993cf05efd1ce3b55d3",
  measurementId: "G-99H8JZ6Z84"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Zorg dat sessie lokaal blijft bewaard
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Authenticatie-persistentie ingesteld op localStorage");
  })
  .catch((error) => {
    console.error("Fout bij het instellen van persistentie:", error);
  });

export { auth, db };
