import { db } from './firebaseConfig.js';
import { collection, getDocs, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Functie om de tabel met meldingen te laden
async function loadMeldingen() {
    try {
        const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
        const tableBody = document.querySelector('#meldingentabel tbody');
        tableBody.innerHTML = ''; // Maak de tabel eerst leeg

        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            const row = document.createElement('tr');

            // Voeg de gegevens uit de document toe aan de rij
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

        // Voeg event listeners toe aan alle death-knoppen
        document.querySelectorAll('.death-button').forEach(button => {
            button.addEventListener('click', handleDeathClick);
        });

    } catch (err) {
        console.error("Fout bij het ophalen van meldingen:", err);
    }
}

// Functie om de "gestorven" status bij te werken wanneer de knop wordt aangeklikt
async function handleDeathClick(e) {
    const docId = e.target.getAttribute('data-id'); // Haal de document-ID op
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

// Laad de meldingen wanneer de pagina wordt geladen
window.onload = loadMeldingen;
