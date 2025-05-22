import { db } from './firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Counts all submitted forms = total number of infections
export async function getTotalCases() {
  try {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    return snapshot.size;
  } catch (err) {
    console.error("Error counting total cases:", err);
    return "Error";
  }
}

// Counts active cases: no recoveryDate present
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
    console.error("Error counting active cases:", err);
    return "Error";
  }
}

// Counts recovered cases: recoveryDate is filled in
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
    console.error("Error counting recovered cases:", err);
    return "Error";
  }
}

export async function getDeathsCases() {
  try {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    let deathCount = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.gestorven) {
        deathCount++;
      }
    });

    return deathCount;
  } catch (err) {
    console.error("Error counting death cases:", err);
    return "Error";
  }
}
