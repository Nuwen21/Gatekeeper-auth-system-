// This is where we grab stuff from Firebase, like a boss
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

// My super secret Firebase config (shhh!)
const firebaseConfig = {
    apiKey: "AIzaSyDaqv5lilrSMnAZQzZSTdY_6PMUEQUtmWg",
    authDomain: "web-site-a0e0d.firebaseapp.com",
    projectId: "web-site-a0e0d",
    storageBucket: "web-site-a0e0d.firebasestorage.app",
    messagingSenderId: "818908143110",
    appId: "1:818908143110:web:7f43deb4f4c533e00fed87",
    measurementId: "G-E3FHCFH8MD"
};

// Let's wake up Firebase! (like coffee for code)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app); // Analytics is now vibing

// Grab the login form and sign up link, because why not
const loginForm = document.getElementById('login-form');
const signupLink = document.getElementById('signup-link');

// Watch out! If you're logged in, we send you to the dashboard. If not, you stay here and chill.
onAuthStateChanged(auth, (user) => {
    if (user) {
        // You made it! Off to the dashboard you go
        console.log("User is logged in, redirecting to dashboard...");
        window.location.href = "dashboard.html"; // Magic door
    } else {
        // Nope, you're not logged in. Stay put!
        console.log("User is logged out, remaining on login page.");
    }
});

// When you try to log in, let's see if you know the secret password
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Woohoo! You logged in
            console.log('Login successful:', userCredential.user.email);
        })
        .catch((error) => {
            console.error('Login Error:', error.code, error.message);
            alert('Error: ' + error.message);
        });
});

// If you click sign up, we send you to the sign up page. No rocket science here.
signupLink.addEventListener('click', (e) => {
    window.location.href = 'signup.html';
});