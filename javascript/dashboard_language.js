const translations = {
    en: {
        welcome: "Welcome to the Belgian Pandemic Monitor",
        description: "Check the up-to-date numbers regarding viral infections in Belgium and more",
        importantInfo: "Cases",
        totalCases: "Total cases:",
        activeCases: "Active cases:",
        recoveredCases: "Cured cases:",
        aboutViruses: "About the Viruses",
        covid: {
            title: "Covid (COVID-19)",
            fullName: "Full name:",
            causativeAgent: "Causative agent:",
            spread: "Spread:",
            symptoms: "Symptoms:",
            prevention: "Prevention:",
            severity: "Severity:"
        },
        flu: {
            title: "Seasonal flu",
            fullName: "Full name:",
            causativeAgent: "Causative agent:",
            spread: "Spread:",
            symptoms: "Symptoms:",
            prevention: "Prevention:",
            severity: "Severity:"
        },
        malaria: {
            title: "Malaria",
            causativeAgent: "Causative agent:",
            spread: "Spread:",
            symptoms: "Symptoms:",
            prevention: "Prevention:",
            severity: "Severity:"
        },
        detailsLink: "For more details of all cases, please visit statistics."
    },
    nl: {
        welcome: "Welkom bij de Belgische Pandemie Monitor",
        description: "Bekijk de actuele cijfers over virale infecties in België en meer",
        importantInfo: "Gevallen",
        totalCases: "Totaal aantal gevallen:",
        activeCases: "Actieve gevallen:",
        recoveredCases: "Genezen gevallen:",
        aboutViruses: "Over de Virussen",
        covid: {
            title: "Covid (COVID-19)",
            fullName: "Volledige naam:",
            causativeAgent: "Verwekkende stof:",
            spread: "Verspreiding:",
            symptoms: "Symptomen:",
            prevention: "Preventie:",
            severity: "Ernst:"
        },
        flu: {
            title: "Seizoensgriep",
            fullName: "Volledige naam:",
            causativeAgent: "Verwekkende stof:",
            spread: "Verspreiding:",
            symptoms: "Symptomen:",
            prevention: "Preventie:",
            severity: "Ernst:"
        },
        malaria: {
            title: "Malaria",
            causativeAgent: "Verwekkende stof:",
            spread: "Verspreiding:",
            symptoms: "Symptomen:",
            prevention: "Preventie:",
            severity: "Ernst:"
        },
        detailsLink: "Voor meer details over alle gevallen, bezoek statistieken."
    },
    fr: {
        welcome: "Bienvenue sur le Moniteur de la Pandémie Belge",
        description: "Consultez les chiffres actualisés concernant les infections virales en Belgique et plus",
        importantInfo: "Cas",
        totalCases: "Cas totaux :",
        activeCases: "Cas actifs :",
        recoveredCases: "Cas guéris :",
        aboutViruses: "À propos des Virus",
        covid: {
            title: "Covid (COVID-19)",
            fullName: "Nom complet :",
            causativeAgent: "Agent causal :",
            spread: "Propagation :",
            symptoms: "Symptômes :",
            prevention: "Prévention :",
            severity: "Gravité :"
        },
        flu: {
            title: "Grippe saisonnière",
            fullName: "Nom complet :",
            causativeAgent: "Agent causal :",
            spread: "Propagation :",
            symptoms: "Symptômes :",
            prevention: "Prévention :",
            severity: "Gravité :"
        },
        malaria: {
            title: "Paludisme",
            causativeAgent: "Agent causal :",
            spread: "Propagation :",
            symptoms: "Symptômes :",
            prevention: "Prévention :",
            severity: "Gravité :"
        },
        detailsLink: "Pour plus de détails sur tous les cas, visitez les statistiques."
    },
    de: {
        welcome: "Willkommen beim Belgischen Pandemie-Monitor",
        description: "Überprüfen Sie die aktuellen Zahlen zu Virusinfektionen in Belgien und mehr",
        importantInfo: "Fälle",
        totalCases: "Gesamtfälle:",
        activeCases: "Aktive Fälle:",
        recoveredCases: "Geheilte Fälle:",
        aboutViruses: "Über die Viren",
        covid: {
            title: "Covid (COVID-19)",
            fullName: "Vollständiger Name:",
            causativeAgent: "Erreger:",
            spread: "Verbreitung:",
            symptoms: "Symptome:",
            prevention: "Prävention:",
            severity: "Schweregrad:"
        },
        flu: {
            title: "Saisonale Grippe",
            fullName: "Vollständiger Name:",
            causativeAgent: "Erreger:",
            spread: "Verbreitung:",
            symptoms: "Symptome:",
            prevention: "Prävention:",
            severity: "Schweregrad:"
        },
        malaria: {
            title: "Malaria",
            causativeAgent: "Erreger:",
            spread: "Verbreitung:",
            symptoms: "Symptome:",
            prevention: "Prävention:",
            severity: "Schweregrad:"
        },
        detailsLink: "Für weitere Details zu allen Fällen besuchen Sie bitte die Statistiken."
    }
};

// Function to switch language
function switchLanguage(lang) {
    document.querySelector('h1').textContent = translations[lang].welcome;
    document.querySelector('.main-content p').textContent = translations[lang].description;
    document.querySelector('.information h2').textContent = translations[lang].importantInfo;
    document.querySelector('#total_cases').previousSibling.textContent = translations[lang].totalCases;
    document.querySelector('#active_cases').previousSibling.textContent = translations[lang].activeCases;
    document.querySelector('#recovered_cases').previousSibling.textContent = translations[lang].recoveredCases;
    document.querySelector('.info-virus h2').textContent = translations[lang].aboutViruses;

    // Update virus sections
    const covid = translations[lang].covid;
    const flu = translations[lang].flu;
    const malaria = translations[lang].malaria;

    document.querySelector('.covid-home h3').textContent = covid.title;
    document.querySelector('.covid-home p:nth-of-type(1)').textContent = `${covid.fullName} Coronavirus Disease 2019`;
    document.querySelector('.covid-home p:nth-of-type(2)').textContent = `${covid.causativeAgent} SARS-CoV-2`;
    document.querySelector('.covid-home p:nth-of-type(3)').textContent = `${covid.spread} Through droplets in the air`;
    document.querySelector('.covid-home p:nth-of-type(4)').textContent = `${covid.symptoms} Fever, cough, fatigue`;
    document.querySelector('.covid-home p:nth-of-type(5)').textContent = `${covid.prevention} Vaccination, washing hands`;
    document.querySelector('.covid-home p:nth-of-type(6)').textContent = `${covid.severity} Can be mild to severe`;

    document.querySelector('.griep-home h3').textContent = flu.title;
    document.querySelector('.malaria-home h3').textContent = malaria.title;

    document.querySelector('#details-link').textContent = translations[lang].detailsLink;
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