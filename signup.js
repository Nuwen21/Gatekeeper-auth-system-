// Time to set up Firebase, like building a pillow fort
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDaqv5lilrSMnAZQzZSTdY_6PMUEQUtmWg",
    authDomain: "web-site-a0e0d.firebaseapp.com",
    projectId: "web-site-a0e0d",
    storageBucket: "web-site-a0e0d.firebasestorage.app",
    messagingSenderId: "818908143110",
    appId: "1:818908143110:web:7f43deb4f4c533e00fed87",
    measurementId: "G-E3FHCFH8MD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// When you sign up, we save your info in Firestore, like putting cookies in a jar
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    try {
        // Firestore gets your email and password, and gives you a virtual high five
        await addDoc(collection(db, "Sign_up"), {
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        });
        alert('Sign up successful! You can now log in.');
        window.location.href = 'index.html';
    } catch (error) {
        alert('Sign up error: ' + error.message);
    }
});
