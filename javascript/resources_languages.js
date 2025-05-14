const translations = {
    en: {
        overviewReports: "Overview of reports",
        dateReported: "Date reported",
        region: "Region",
        age: "Age",
        gender: "Gender",
        virusType: "Virus type",
        vaccinationStatus: "Vaccination status",
        moreDetails: "For more details of the reports, click",
        here: "here",
        currentTime: "Current time:",
        pageLoadedAt: "Page loaded at:",
        footerText: "© 2025 Belgian Pandemic Monitor. All rights reserved."
    },
    nl: {
        overviewReports: "Overzicht van meldingen",
        dateReported: "Datum melding",
        region: "Regio",
        age: "Leeftijd",
        gender: "Geslacht",
        virusType: "Virus Type",
        vaccinationStatus: "Vaccinatie status",
        moreDetails: "Voor meer details van de meldingen kan je",
        here: "hier klikken",
        currentTime: "Huidige tijd:",
        pageLoadedAt: "Pagina geladen op:",
        footerText: "© 2025 Belgian Pandemic Monitor. All rights reserved."
        },
    fr: {
        overviewReports: "Aperçu des rapports",
        dateReported: "Date du rapport",
        region: "Région",
        age: "Âge",
        gender: "Genre",
        virusType: "Type de Virus",
        vaccinationStatus: "Statut de Vaccination",
        moreDetails: "Pour plus de détails sur les rapports, cliquez",
        here: "ici",
        currentTime: "Heure actuelle :",
        pageLoadedAt: "Page chargée à :",
        footerText: "© 2025 Belgian Pandemic Monitor. All rights reserved."
        }
};

// Function to switch language
function switchLanguage(lang) {
    document.querySelector('.meldingen-sectie h2').textContent = translations[lang].overviewReports;

    const tableHeaders = document.querySelectorAll('#meldingentabel thead th');
    tableHeaders[0].textContent = translations[lang].dateReported;
    tableHeaders[1].textContent = translations[lang].region;
    tableHeaders[2].textContent = translations[lang].age;
    tableHeaders[3].textContent = translations[lang].gender;
    tableHeaders[4].textContent = translations[lang].virusType;
    tableHeaders[5].textContent = translations[lang].vaccinationStatus;

    const detailsParagraph = document.querySelector('.meldingen-sectie p');
    detailsParagraph.innerHTML = `${translations[lang].moreDetails} <a href="/html/statistics.html">${translations[lang].here}</a>.`;

    document.querySelector('#datetime').textContent = `${translations[lang].currentTime} `;
    document.querySelector('#timestamp').textContent = `${translations[lang].pageLoadedAt} `;

    document.querySelector('footer p').textContent = translations[lang].footerText;
}

// Add event listeners to buttons
document.querySelectorAll('.language-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        localStorage.setItem('selectedLanguage', lang); // Save the selected language
        switchLanguage(lang); // Update the content dynamically
    });
});

// Load the saved language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English
    switchLanguage(savedLanguage); // Apply the saved language
});