const translations = {
    en: {
        statisticsOverview: "Statistics Overview",
        filterRegion: "Region:",
        allRegions: "All regions",
        applyFilter: "Apply Filter",
        viewPerRegion: "View per Region",
        region: "Region",
        totalCases: "Total Cases",
        activeCases: "Active Cases",
        recoveredCases: "Recovered Cases",
        footerText: "© 2025 Belgian Pandemic Monitor. All rights reserved."
    },
    nl: {
        statisticsOverview: "Statistieken Overzicht",
        filterRegion: "Regio:",
        allRegions: "Alle regio's",
        applyFilter: "Filter toepassen",
        viewPerRegion: "Bekijk per Regio",
        region: "Regio",
        totalCases: "Totale gevallen",
        activeCases: "Actieve gevallen",
        recoveredCases: "Herstelde gevallen",
        footerText: "© 2025 Belgian Pandemic Monitor. All rights reserved."    },
    fr: {
        statisticsOverview: "Aperçu des Statistiques",
        filterRegion: "Région :",
        allRegions: "Toutes les régions",
        applyFilter: "Appliquer le Filtre",
        viewPerRegion: "Voir par Région",
        region: "Région",
        totalCases: "Cas Totaux",
        activeCases: "Cas Actifs",
        recoveredCases: "Cas Guéris",
        footerText: "© 2025 Belgian Pandemic Monitor. All rights reserved."    }
};

// Function to switch language
function switchLanguage(lang) {
    document.querySelector('.statistics h2').textContent = translations[lang].statisticsOverview;
    document.querySelector('label[for="filter-regio"]').textContent = translations[lang].filterRegion;
    document.querySelector('#filter-regio option[value="all"]').textContent = translations[lang].allRegions;
    document.querySelector('#filter-knop').textContent = translations[lang].applyFilter;
    document.querySelector('h3').textContent = translations[lang].viewPerRegion;

    // Update table headers
    const tableHeaders = document.querySelectorAll('#statistics-table thead th');
    tableHeaders[0].textContent = translations[lang].region;
    tableHeaders[1].textContent = translations[lang].totalCases;
    tableHeaders[2].textContent = translations[lang].activeCases;
    tableHeaders[3].textContent = translations[lang].recoveredCases;

    // Update footer text
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

// localStorage
document.querySelectorAll('.language-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        localStorage.setItem('selectedLanguage', lang); // Save the selected language
        switchLanguage(lang); // Update the content dynamically
    });
});