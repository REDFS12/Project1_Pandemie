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

            const buttonLabel = data.gestorven ? 'Markeer als niet gestorven' : 'Markeer als gestorven';

            row.innerHTML = `
                <td>${data.ingaveDatum}</td>
                <td>${data.regio}</td>
                <td>${data.leeftijd}</td>
                <td>${data.geslacht}</td>
                <td>${data.virusType}</td>
                <td>${data.statusVaccinatie}</td>
                <td>
                    <button class="death-button" data-id="${docSnap.id}" data-status="${data.gestorven}">
                        ${buttonLabel}
                    </button>
                </td>
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

// Functie om de "gestorven" status te togglen wanneer de knop wordt aangeklikt
async function handleDeathClick(e) {
    const button = e.target;
    const docId = button.getAttribute('data-id');
    const huidigeStatus = button.getAttribute('data-status') === 'true';

    const nieuweStatus = !huidigeStatus;

    try {
        const docRef = doc(db, "Variabelen-geinfecteerden", docId);
        await updateDoc(docRef, {
            gestorven: nieuweStatus
        });

        // Update knoplabel en data-status
        button.innerText = nieuweStatus ? "Markeer als niet gestorven" : "Markeer als gestorven";
        button.setAttribute('data-status', nieuweStatus);

        console.log("Gestorven-status succesvol aangepast.");
    } catch (err) {
        console.error("Fout bij updaten van status:", err);
    }
}

// Laad de meldingen wanneer de pagina wordt geladen
window.onload = loadMeldingen;
