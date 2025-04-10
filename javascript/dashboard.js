import { getTotalCases } from './import.js';
// haalt de functie van import.js voor medlingen op te tellen
getTotalCases().then(totaal => {
    const totalCasesView = document.getElementById("total_cases");
    if (totalCasesView) {
      totalCasesView.innerText = totaal;
    }
  });