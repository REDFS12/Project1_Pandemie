import { db, auth } from './firebaseConfig.js';
import { collection, getDocs, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

async function loadMeldingen() {
    try {
        const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
        const tableBody = document.querySelector('#meldingentabel tbody');
        tableBody.innerHTML = '';

        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            const row = document.createElement('tr');
            const gestorven = data.gestorven === true;

            const button = document.createElement('button');
            button.className = 'death-button';
            button.dataset.id = docSnap.id;
            button.dataset.status = gestorven;
            button.innerText = gestorven ? 'Patient is gestorven' : 'Patient is levend';
            button.style.backgroundColor = gestorven ? '#e74c3c' : '#2ecc71';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.padding = '5px 10px';
            button.style.cursor = 'pointer';
            button.style.borderRadius = '5px';

            const cell = document.createElement('td');
            cell.appendChild(button);

            row.innerHTML = `
                <td>${data.ingaveDatum}</td>
                <td>${data.regio}</td>
                <td>${data.leeftijd}</td>
                <td>${data.geslacht}</td>
                <td>${data.virusType}</td>
                <td>${data.statusVaccinatie}</td>
            `;
            row.appendChild(cell);
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.death-button').forEach(button => {
            button.addEventListener('click', handleDeathClick);
        });

    } catch (err) {
        console.error("Fout bij het ophalen van meldingen:", err);
    }
}

async function handleDeathClick(e) {
    const button = e.target;
    const docId = button.dataset.id;
    const huidigeStatus = button.dataset.status === 'true';
    const nieuweStatus = !huidigeStatus;

    try {
        const docRef = doc(db, "Variabelen-geinfecteerden", docId);
        await updateDoc(docRef, {
            gestorven: nieuweStatus
        });

        button.innerText = nieuweStatus ? 'Patient is gestorven' : 'Patient is levend';
        button.dataset.status = nieuweStatus;
        button.style.backgroundColor = nieuweStatus ? '#e74c3c' : '#2ecc71';

        console.log("Status succesvol aangepast.");
    } catch (err) {
        console.error("Fout bij bijwerken:", err);
    }
}

// 🔐 Authenticatiecheck bij pagina laden
onAuthStateChanged(auth, user => {
    if (user) {
        document.getElementById('protected-resources').style.display = 'block';
        document.getElementById('not-logged-in-message').style.display = 'none';
        loadMeldingen();
    } else {
        document.getElementById('protected-resources').style.display = 'none';
        document.getElementById('not-logged-in-message').style.display = 'block';
    }
});
