import { auth, db } from './firebaseConfig.js';  
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const registerForm = document.getElementById('register-form');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const roleSelect = document.getElementById('user-role');

// Handle registration
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();  

    const email = emailField.value;
    const password = passwordField.value;
    const role = roleSelect.value; 

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Stop immediately if userCredential does not exist
        if (!userCredential || !userCredential.user) {
            throw new Error("Registration failed. Please try again.");
        }
    
        const user = userCredential.user;
    
        const collectionName = role === "dokter" ? "dokters" : "gebruikers";
        await setDoc(doc(db, collectionName, user.uid), {
            uid: user.uid,
            email: email,
            rol: role,
            approved: false // User is not approved by default
        });
    
        window.location.href = role === "dokter"
            ? '/html/doctor_dashboardEN.html'
            : '/html/dashboardEN.html';
    
    } catch (error) {
        console.error("Error during registration:", error);
    
        if (error.code === 'auth/email-already-in-use') {
            alert('This email address is already registered. Log in or use another email address.');
        } else {
            alert('Registration error: ' + error.message);
        }
        return;
    }
});

// localStorage
document.querySelectorAll('.language-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        localStorage.setItem('selectedLanguage', lang); // Save the selected language
        switchLanguage(lang); // Update the content dynamically
    });
});