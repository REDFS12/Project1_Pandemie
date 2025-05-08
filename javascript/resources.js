import { collection, getDocs, doc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { auth, db } from './firebaseConfig.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';


// Check of gebruiker is ingelogd en of het een dokter is
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Gebruiker is ingelogd:", user.email);

    // Haal de rol van de gebruiker op uit Firestore
    const userRef = doc(db, "dokters", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      console.log("Toegang verleend, je bent een dokter.");
      loadMeldingen(); // Roep de functie aan om meldingen in te laden
    }
  } else {
    console.log("Geen gebruiker ingelogd, doorsturen naar loginpagina...");
    window.location.href = "/html/login.html"; 
  }
});

async function loadMeldingen() {
  try {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    const tableBody = document.querySelector('#meldingentabel tbody');
    tableBody.innerHTML = ''; 

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const row = document.createElement('tr');

      // Voeg de gegevens uit het document toe aan de rij
      row.innerHTML = `
        <td>${data.ingaveDatum}</td>
        <td>${data.regio}</td>
        <td>${data.leeftijd}</td>
        <td>${data.geslacht}</td>
        <td>${data.virusType}</td>
        <td>${data.statusVaccinatie}</td>
        <td><button class="death-button" data-id="${docSnap.id}">${data.gestorven ? 'Gestorven' : 'Markeer als gestorven'}</button></td>
      `;
      tableBody.appendChild(row);
    });

    document.querySelectorAll('.death-button').forEach(button => {
      button.addEventListener('click', handleDeathClick);
    });
  } catch (err) {
    console.error("Fout bij het ophalen van meldingen:", err);
  }
}

// Functie om de "gestorven" status bij te werken wanneer de knop wordt aangeklikt
async function handleDeathClick(e) {
  const docId = e.target.getAttribute('data-id'); 
  try {
    const docRef = doc(db, "Variabelen-geinfecteerden", docId);

    // Update de gestorven status naar true
    await updateDoc(docRef, {
      gestorven: true
    });

    // Werk de knop bij in de tabel
    e.target.innerText = "Gestorven";
    e.target.disabled = true; // Zet de knop uit zodat je niet meerdere keren kunt klikken

    console.log("Document succesvol bijgewerkt!");
  } catch (err) {
    console.error("Er is een fout opgetreden bij het updaten van het document:", err);
  }
}
