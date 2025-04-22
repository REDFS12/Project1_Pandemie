import { getTotalCases, getActiveCases, getRecoveredCases } from './import.js';

getTotalCases().then(total => {
  document.getElementById("total_cases").innerText = total;
});

getActiveCases().then(active => {
  document.getElementById("active_cases").innerText = active;
});

getRecoveredCases().then(recovered => {
  document.getElementById("recovered_cases").innerText = recovered;
});
