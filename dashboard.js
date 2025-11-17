// We grab Firebase stuff here, like picking apples
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
    getAuth, 
    signOut,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";


// My not-so-secret Firebase config (like a recipe for cookies)
const firebaseConfig = {
    apiKey: "AIzaSyDaqv5lilrSMnAZQzZSTdY_6PMUEQUtmWg",
    authDomain: "web-site-a0e0d.firebaseapp.com",
    projectId: "web-site-a0e0d",
    storageBucket: "web-site-a0e0d.firebasestorage.app",
    messagingSenderId: "818908143110",
    appId: "1:818908143110:web:7f43deb4f4c533e00fed87",
    measurementId: "G-E3FHCFH8MD"
};

// Wake up Firebase, like a rooster in the morning
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app); // Analytics is now awake

// Grab all the buttons and fields, because we love clicking things
const logoutButton = document.getElementById('logout-button');
const userEmailDisplay = document.getElementById('user-email-display');
const profileForm = document.getElementById('profile-form');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileInfo = document.getElementById('profile-info');

let currentUserId = null; // This is where we keep your user ID, like a secret note

// If you're logged in, we show your email. If not, we kick you out (nicely)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // You made it! Welcome to the dashboard
        currentUserId = user.uid; // Put your user ID here
        console.log("Dashboard: User is logged in", user.email, user.uid);
        
        // Show your email everywhere, because why not
        userEmailDisplay.textContent = user.email;
        profileEmail.value = user.email; // Fill in the email field
        
    } else {
        // No user? Back to login you go!
        console.log("Dashboard: No user found, redirecting to login.");
        window.location.href = "index.html";
    }
});

// --- 6. Logout Button ---
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log("User logged out.");
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
});

// --- 7. NEW: Save Profile Form ---
profileForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the form from reloading the page

    if (!currentUserId) {
        alert("Error: You are not logged in!");
        return;
    }

    // Get the values from the form
    const name = profileName.value;
    const info = profileInfo.value;

    console.log("Saving data for user:", currentUserId);

    // This is the key Firestore command:
    setDoc(doc(db, "users", currentUserId), {
        name: name,
        email: profileEmail.value, // The pre-filled email
        favoriteMovie: info
    })
    .then(() => {
        alert("Profile Saved!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        alert("Error saving profile: " + error.message);
    });
});