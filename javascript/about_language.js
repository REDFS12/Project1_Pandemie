const translations = {
    en: {
        title: "The Belgian Pandemic Monitor",
        projectDescription: "Project description",
        projectText1: "The Belgian Pandemic Monitor is a web application designed to track and visualize data related to pandemics in Belgium. The aim of this platform is to provide healthcare professionals, researchers and the general public with real-time data on cases, recoveries and deaths. It is intended to be a valuable resource for understanding the progression of pandemics and supporting decision-making processes.",
        projectText2: "The primary target audience of this application includes physicians, health officials, researchers and anyone interested in monitoring the impact of pandemics in Belgium.",
        dataSources: "Data sources",
        dataSourcesText: "The data presented in this application is collected and validated by Belgian doctors. These sources provide accurate and real-time statistics on infection rates, recoveries and deaths in Belgium.",
        meetTheTeam: "Meet the team",
        teamText: "The Belgian Pandemic Monitor was developed by a team of passionate individuals committed to creating a tool that helps combat the effects of pandemics. Here is a look at the team behind the project:",
        teamMember1: "Ewout De Roock - Project manager & Health researcher",
        teamMember2: "Amghar Nabil - Head developer & UX/UI designer"
    },
    nl: {
        title: "De Belgische Pandemie Monitor",
        projectDescription: "Projectbeschrijving",
        projectText1: "De Belgische Pandemie Monitor is een webapplicatie ontworpen om gegevens met betrekking tot pandemieën in België te volgen en te visualiseren. Het doel van dit platform is om zorgprofessionals, onderzoekers en het algemene publiek realtime gegevens te bieden over gevallen, herstelden en sterfgevallen. Het is bedoeld als een waardevolle bron voor het begrijpen van de voortgang van pandemieën en het ondersteunen van besluitvormingsprocessen.",
        projectText2: "De primaire doelgroep van deze applicatie omvat artsen, gezondheidsfunctionarissen, onderzoekers en iedereen die geïnteresseerd is in het volgen van de impact van pandemieën in België.",
        dataSources: "Gegevensbronnen",
        dataSourcesText: "De gegevens die in deze applicatie worden gepresenteerd, worden verzameld en gevalideerd door Belgische artsen. Deze bronnen bieden nauwkeurige en realtime statistieken over infectiepercentages, herstelcijfers en sterfgevallen in België.",
        meetTheTeam: "Ontmoet het team",
        teamText: "De Belgische Pandemie Monitor is ontwikkeld door een team van gepassioneerde individuen die zich inzetten voor het creëren van een tool die helpt bij het bestrijden van de effecten van pandemieën. Hier is een kijkje naar het team achter het project:",
        teamMember1: "Ewout De Roock - Project manager & Gezondheidsonderzoeker",
        teamMember2: "Amghar Nabil - Hoofdontwikkelaar & UX/UI ontwerper"
    },
    fr: {
        title: "Le Moniteur de la Pandémie Belge",
        projectDescription: "Description du projet",
        projectText1: "Le Moniteur de la Pandémie Belge est une application web conçue pour suivre et visualiser les données relatives aux pandémies en Belgique. L'objectif de cette plateforme est de fournir aux professionnels de la santé, aux chercheurs et au grand public des données en temps réel sur les cas, les guérisons et les décès. Elle est destinée à être une ressource précieuse pour comprendre la progression des pandémies et soutenir les processus de prise de décision.",
        projectText2: "Le public cible principal de cette application comprend les médecins, les responsables de la santé, les chercheurs et toute personne intéressée par le suivi de l'impact des pandémies en Belgique.",
        dataSources: "Sources de données",
        dataSourcesText: "Les données présentées dans cette application sont collectées et validées par des médecins belges. Ces sources fournissent des statistiques précises et en temps réel sur les taux d'infection, les guérisons et les décès en Belgique.",
        meetTheTeam: "Rencontrez l'équipe",
        teamText: "Le Moniteur de la Pandémie Belge a été développé par une équipe de personnes passionnées qui s'engagent à créer un outil pour aider à lutter contre les effets des pandémies. Voici un aperçu de l'équipe derrière le projet :",
        teamMember1: "Ewout De Roock - Manager de projet & Chercheur en santé",
        teamMember2: "Amghar Nabil - Développeur principal & Designer UX/UI"
    },
    de: {
        title: "Der Belgische Pandemie-Monitor",
        projectDescription: "Projektbeschreibung",
        projectText1: "Der Belgische Pandemie-Monitor ist eine Webanwendung, die entwickelt wurde, um Daten im Zusammenhang mit Pandemien in Belgien zu verfolgen und zu visualisieren. Ziel dieser Plattform ist es, Gesundheitsfachkräften, Forschern und der Öffentlichkeit Echtzeitdaten zu Fällen, Genesungen und Todesfällen bereitzustellen. Sie soll eine wertvolle Ressource sein, um den Verlauf von Pandemien zu verstehen und Entscheidungsprozesse zu unterstützen.",
        projectText2: "Die Hauptzielgruppe dieser Anwendung umfasst Ärzte, Gesundheitsbeamte, Forscher und alle, die sich für die Überwachung der Auswirkungen von Pandemien in Belgien interessieren.",
        dataSources: "Datenquellen",
        dataSourcesText: "Die in dieser Anwendung präsentierten Daten werden von belgischen Ärzten gesammelt und validiert. Diese Quellen liefern genaue und aktuelle Statistiken zu Infektionsraten, Genesungen und Todesfällen in Belgien.",
        meetTheTeam: "Das Team kennenlernen",
        teamText: "Der Belgische Pandemie-Monitor wurde von einem Team leidenschaftlicher Personen entwickelt, die sich der Schaffung eines Tools verschrieben haben, das hilft, die Auswirkungen von Pandemien zu bekämpfen. Hier ist ein Blick auf das Team hinter dem Projekt:",
        teamMember1: "Ewout De Roock - Projektmanager & Gesundheitsforscher",
        teamMember2: "Amghar Nabil - Hauptentwickler & UX/UI-Designer"
    }
};

// Function to switch language
function switchLanguage(lang) {
    document.querySelector('h1').textContent = translations[lang].title;
    document.querySelector('.project-description h2').textContent = translations[lang].projectDescription;
    document.querySelector('.project-description p:nth-of-type(1)').textContent = translations[lang].projectText1;
    document.querySelector('.project-description p:nth-of-type(2)').textContent = translations[lang].projectText2;
    document.querySelector('.data-sources h2').textContent = translations[lang].dataSources;
    document.querySelector('.data-sources p').textContent = translations[lang].dataSourcesText;
    document.querySelector('.team-members h2').textContent = translations[lang].meetTheTeam;
    document.querySelector('.team-members p').textContent = translations[lang].teamText;
    document.querySelector('.team-members ul li:nth-of-type(1)').textContent = translations[lang].teamMember1;
    document.querySelector('.team-members ul li:nth-of-type(2)').textContent = translations[lang].teamMember2;
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