
    import { db } from './firebaseConfig.js';
    import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

    async function laadMeldingen() {
        const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
        const tbody = document.querySelector("#meldingentabel tbody");

        snapshot.forEach(doc => {
            const data = doc.data();
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${data.ingaveDatum || 'Onbekend'}</td>
                <td>${data.regio || 'Onbekend'}</td>
                <td>${data.leeftijd || '-'}</td>
                <td>${data.geslacht || '-'}</td>
                <td>${data.virusType || 'Onbekend'}</td>
                <td>${data.statusVaccinatie || 'Onbekend'}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.addEventListener('DOMContentLoaded', laadMeldingen);

    const now = new Date();

    const currentDateTime = now.toLocaleString();

    // localStorage
document.querySelectorAll('.language-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        localStorage.setItem('selectedLanguage', lang); // Save the selected language
        switchLanguage(lang); // Update the content dynamically
    });
});