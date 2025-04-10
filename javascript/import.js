import { db } from './firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// telt op hoeveel formulier werd ingevuld en kan dan weten hoeveel zieken(cases) er zijn.
export async function getTotalCases() {
  try {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    return snapshot.size;
  } catch (err) {
    console.error("Fout bij tellen:", err);
    return "Fout";
  }
}