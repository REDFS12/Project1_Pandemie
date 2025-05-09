const translations = {
    en: {
        importantInfo: "Important Information",
        totalCases: "Total cases:",
        activeCases: "Active cases:",
        recoveredCases: "Recovered cases:",
        deathCases: "Deaths:",
        reportInfection: "Report a New Infection:",
        region: "Region:",
        workLocation: "Work Location:",
        age: "Age:",
        familySize: "Family Size:",
        gender: "Gender:",
        male: "Male",
        female: "Female",
        virusType: "Type of Virus:",
        infectionDate: "Infection Date:",
        entryDate: "Entry Date:",
        recoveryDate: "Recovery Date:",
        vaccinationStatus: "Vaccination Status:",
        vaccinated: "Vaccinated",
        notVaccinated: "Not Vaccinated",
        save: "Save",
        infectionsByRegion: "Infections by Region:"
    },
    nl: {
        importantInfo: "Belangrijke informatie",
        totalCases: "Totaal gevallen:",
        activeCases: "Actieve gevallen:",
        recoveredCases: "Herstelde gevallen:",
        deathCases: "Sterfgevallen:",
        reportInfection: "Nieuwe besmetting melden:",
        region: "Regio:",
        workLocation: "Werk Locatie:",
        age: "Leeftijd:",
        familySize: "Grootte van het gezin:",
        gender: "Geslacht:",
        male: "Man",
        female: "Vrouw",
        virusType: "Type Virus:",
        infectionDate: "Datum besmetting:",
        entryDate: "Ingave Datum:",
        recoveryDate: "Genezing Datum:",
        vaccinationStatus: "Status vaccinatie:",
        vaccinated: "Gevaccineerd",
        notVaccinated: "Niet gevaccineerd",
        save: "Opslaan",
        infectionsByRegion: "Besmettingen per Regio:"
    },
    fr: {
        importantInfo: "Informations importantes",
        totalCases: "Cas totaux :",
        activeCases: "Cas actifs :",
        recoveredCases: "Cas guéris :",
        deathCases: "Décès :",
        reportInfection: "Signaler une nouvelle infection :",
        region: "Région :",
        workLocation: "Lieu de travail :",
        age: "Âge :",
        familySize: "Taille de la famille :",
        gender: "Genre :",
        male: "Homme",
        female: "Femme",
        virusType: "Type de virus :",
        infectionDate: "Date d'infection :",
        entryDate: "Date d'entrée :",
        recoveryDate: "Date de guérison :",
        vaccinationStatus: "Statut de vaccination :",
        vaccinated: "Vacciné",
        notVaccinated: "Non vacciné",
        save: "Enregistrer",
        infectionsByRegion: "Infections par région :"
    }
};

// Function to switch language
function switchLanguage(lang) {
    document.querySelector('.information h2').textContent = translations[lang].importantInfo;
    document.querySelector('#total_cases').previousSibling.textContent = translations[lang].totalCases;
    document.querySelector('#aantal_actieve').previousSibling.textContent = translations[lang].activeCases;
    document.querySelector('#aantal_hersteld').previousSibling.textContent = translations[lang].recoveredCases;
    document.querySelector('#aantal_overleden').previousSibling.textContent = translations[lang].deathCases;

    document.querySelector('.meldingen h2').textContent = translations[lang].reportInfection;
    document.querySelector('label[for="regio"]').textContent = translations[lang].region;
    document.querySelector('label[for="werkLocatie"]').textContent = translations[lang].workLocation;
    document.querySelector('label[for="leeftijd"]').textContent = translations[lang].age;
    document.querySelector('label[for="gezinGrootte"]').textContent = translations[lang].familySize;
    document.querySelector('label[for="geslacht"]').textContent = translations[lang].gender;
    document.querySelector('#geslacht option[value="man"]').textContent = translations[lang].male;
    document.querySelector('#geslacht option[value="vrouw"]').textContent = translations[lang].female;
    document.querySelector('label[for="virusType"]').textContent = translations[lang].virusType;
    document.querySelector('label[for="datumBesmetting"]').textContent = translations[lang].infectionDate;
    document.querySelector('label[for="ingaveDatum"]').textContent = translations[lang].entryDate;
    document.querySelector('label[for="genezingDatum"]').textContent = translations[lang].recoveryDate;
    document.querySelector('label[for="statusVaccinatie"]').textContent = translations[lang].vaccinationStatus;
    document.querySelector('#statusVaccinatie option[value="gevaccineerd"]').textContent = translations[lang].vaccinated;
    document.querySelector('#statusVaccinatie option[value="nietGevaccineerd"]').textContent = translations[lang].notVaccinated;
    document.querySelector('.button').textContent = translations[lang].save;

    document.querySelector('.chartSection h2').textContent = translations[lang].infectionsByRegion;
}

// Add event listeners to buttons
document.querySelectorAll('.language-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

// localStorage
document.querySelectorAll('.language-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        localStorage.setItem('selectedLanguage', lang); // Save the selected language
        switchLanguage(lang); // Update the content dynamically
    });
});