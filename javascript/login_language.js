// Translations for each language
const translations = {
    en: {
        loginTitle: "Login",
        selectRole: "Select Role:",
        doctor: "Doctor",
        user: "User",
        emailPlaceholder: "E-mail",
        passwordPlaceholder: "Password",
        loginButton: "Login",
        createAccount: "Create an account",
        forgotPassword: "Forgot password?",
        backHome: "Back to home page",
        footerText: "© 2025 Belgian Pandemic Monitor. All rights reserved."
    },
    nl: {
        loginTitle: "Inloggen",
        selectRole: "Selecteer Rol:",
        doctor: "Dokter",
        user: "Gebruiker",
        emailPlaceholder: "E-mailadres",
        passwordPlaceholder: "Wachtwoord",
        loginButton: "Inloggen",
        createAccount: "Maak een account aan",
        forgotPassword: "Wachtwoord vergeten?",
        backHome: "Terug naar de startpagina",
        footerText: "© 2025 Belgische Pandemie Monitor. Alle rechten voorbehouden."
    },
    fr: {
        loginTitle: "Connexion",
        selectRole: "Sélectionnez un rôle :",
        doctor: "Médecin",
        user: "Utilisateur",
        emailPlaceholder: "E-mail",
        passwordPlaceholder: "Mot de passe",
        loginButton: "Connexion",
        createAccount: "Créer un compte",
        forgotPassword: "Mot de passe oublié ?",
        backHome: "Retour à la page d'accueil",
        footerText: "© 2025 Moniteur de la Pandémie Belge. Tous droits réservés."
    }
};

// Function to switch language
function switchLanguage(lang) {
    document.querySelector('.login-title').textContent = translations[lang].loginTitle;
    document.querySelector('.title-role').textContent = translations[lang].selectRole;
    document.querySelector('#user-role option[value="dokter"]').textContent = translations[lang].doctor;
    document.querySelector('#user-role option[value="gebruikers"]').textContent = translations[lang].user;
    document.querySelector('#login-email').placeholder = translations[lang].emailPlaceholder;
    document.querySelector('#login-password').placeholder = translations[lang].passwordPlaceholder;
    document.querySelector('button[type="submit"]').textContent = translations[lang].loginButton;
    document.querySelector('.register').textContent = translations[lang].createAccount;
    document.querySelector('.forgot').textContent = translations[lang].forgotPassword;
    document.querySelector('.back-home').textContent = translations[lang].backHome;
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