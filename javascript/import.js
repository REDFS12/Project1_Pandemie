import { db } from './firebaseConfig.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

export async function getTotalCases() {
  try {
    const snapshot = await getDocs(collection(db, "Variabelen-geinfecteerden"));
    return snapshot.size;
  } catch (err) {
    console.error("Fout bij tellen:", err);
    return "Fout";
  }
}