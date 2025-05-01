import { db } from './firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Telt alle ingevulde formulieren = totaal aantal besmettingen
export async function getTotalCases() {
  try {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    return snapshot.size;
  } catch (err) {
    console.error("Fout bij tellen van totaal gevallen:", err);
    return "Fout";
  }
}

// Telt actieve gevallen: geen genezingDatum aanwezig
export async function getActiveCases() {
  try {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    let activeCount = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      if (!data.genezingDatum) {
        activeCount++;
      }
    });

    return activeCount;
  } catch (err) {
    console.error("Fout bij tellen van actieve gevallen:", err);
    return "Fout";
  }
}

// Telt herstelde gevallen: genezingDatum is ingevuld
export async function getRecoveredCases() {
  try {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    let recoveredCount = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.genezingDatum) {
        recoveredCount++;
      }
    });

    return recoveredCount;
  } catch (err) {
    console.error("Fout bij tellen van herstelde gevallen:", err);
    return "Fout";
  }
}
