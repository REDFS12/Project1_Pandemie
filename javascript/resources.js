import { db, auth } from './firebaseConfig.js';
import { collection, getDocs, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

async function loadReports() {
    try {
        const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
        const tableBody = document.querySelector('#meldingentabel tbody');
        tableBody.innerHTML = '';

        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            const row = document.createElement('tr');
            const deceased = data.gestorven === true;

            const button = document.createElement('button');
            button.className = 'death-button';
            button.dataset.id = docSnap.id;
            button.dataset.status = deceased;
            button.innerText = deceased ? 'Patient is deceased' : 'Patient is alive';
            button.style.backgroundColor = deceased ? '#e74c3c' : '#2ecc71';
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
        console.error("Error fetching reports:", err);
    }
}

async function handleDeathClick(e) {
    const button = e.target;
    const docId = button.dataset.id;
    const currentStatus = button.dataset.status === 'true';
    const newStatus = !currentStatus;

    try {
        const docRef = doc(db, "Variabelen-geinfecteerden", docId);
        await updateDoc(docRef, {
            gestorven: newStatus
        });

        button.innerText = newStatus ? 'Patient is deceased' : 'Patient is alive';
        button.dataset.status = newStatus;
        button.style.backgroundColor = newStatus ? '#e74c3c' : '#2ecc71';

        console.log("Status updated successfully.");
    } catch (err) {
        console.error("Error updating status:", err);
    }
}

document.getElementById('export-btn').addEventListener('click', function () {
    const table = document.getElementById('meldingentabel');
    let csv = [];
    for (let row of table.rows) {
        let rowData = [];
        for (let cell of row.cells) {
            // Escape quotes
            rowData.push('"' + cell.innerText.replace(/"/g, '""') + '"');
        }
        csv.push(rowData.join(','));
    }
    const csvString = csv.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'reports.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// 🔐 Authentication check on page load
onAuthStateChanged(auth, user => {
    if (user) {
        document.getElementById('protected-resources').style.display = 'block';
        document.getElementById('not-logged-in-message').style.display = 'none';
        loadReports();
    } else {
        document.getElementById('protected-resources').style.display = 'none';
        document.getElementById('not-logged-in-message').style.display = 'block';
    }
});
