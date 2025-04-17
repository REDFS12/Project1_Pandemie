import { getTotalCases, getActiveCases } from './import.js';
// haalt de functie van import.js voor medlingen op te tellen
getTotalCases().then(totaal => {
    const totalCasesView = document.getElementById("total_cases");
    if (totalCasesView) {
      totalCasesView.innerText = totaal;
    }
  });

  getActiveCases().then(active => {
    const activeCasesView = document.getElementById("active_cases");
    if (activeCasesView) {
        activeCasesView.innerText = active;
    }
});