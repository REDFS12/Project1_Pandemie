
    import { db } from './firebaseConfig.js';
    import { collection, getDocs, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

    async function laadMeldingen() {
        const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
        const tbody = document.querySelector("#meldingentabel tbody");

        snapshot.forEach(doc => {
            document.querySelectorAll(".gestorven-knop").forEach(knop => {
                knop.addEventListener("click", async () => {
                    const id = knop.getAttribute("data-id");
                    await updateDoc(doc(db, "Variabelen-geinfecteerden", id), {
                        isGestorven: true
                    });
                    laadMeldingen(); // refresh de tabel
                });
            });
            const data = doc.data();
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${data.ingaveDatum || 'Onbekend'}</td>
                <td>${data.regio || 'Onbekend'}</td>
                <td>${data.leeftijd || '-'}</td>
                <td>${data.geslacht || '-'}</td>
                <td>${data.virusType || 'Onbekend'}</td>
                <td>${data.statusVaccinatie || 'Onbekend'}</td>
                <td>${data.isGestorven ? 'JA' : 'NEE'}
                    <button data-id="${doc.id}" class="gestorven-knop">DEAD</button>
                </td>
                `;
            tbody.appendChild(tr);
        });
    }

    window.addEventListener('DOMContentLoaded', laadMeldingen);

