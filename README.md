# Firebase Auth Movie Portal

A movie portal with Firebase authentication and an admin-controlled signup system. Users must be manually approved before they can log in.

## 🔑 Key Features

- **Dual Authentication System**: Login uses Firebase Authentication, Signup uses Firestore Database
- **Admin-Controlled Access**: Signups are saved to Firestore - users can't login until you manually create their account in Firebase Authentication
- **Movie Dashboard**: Responsive grid layout with 20 movie cards and VPN warning banner
- **Glassmorphic Design**: Futuristic login/signup pages with animated gradient backgrounds

## 🛠️ Tech Stack

- Firebase SDK 12.6.0 (Authentication + Firestore + Analytics)
- HTML5, CSS3, JavaScript ES6+


## 🔐 How the Authentication Works

### Login Flow (Firebase Authentication)
1. User enters credentials on `index.html`
2. `app.js` uses `signInWithEmailAndPassword()` from Firebase Authentication
3. If successful → redirects to `dashboard.html`
4. If failed → shows error (user doesn't exist in Firebase Auth)

### Signup Flow (Firestore Database)
1. User enters email/password on `signup.html`
2. `signup.js` saves credentials to Firestore collection `"sign up"`
3. **Credentials are stored in plain text** (you can see their passwords)
4. User CANNOT login yet - they're not in Firebase Authentication
5. **You manually approve**: Go to Firebase Console → Authentication → Add user manually
6. Now they can login using the Login page

### Why This Setup?
- **Manual approval system**: You control who gets access
- **See all signup requests**: Check Firestore `"sign up"` collection
- **Security trade-off**: Passwords are visible to you in Firestore (not hashed)

## 📁 Project Structure
```
├── index.html          # Login page (Firebase Auth)
├── signup.html         # Signup page (Firestore save)
├── dashboard.html      # Movie portal (protected)
├── app.js             # Login logic
├── signup.js          # Signup logic (saves to Firestore)
├── dashboard.js       # Dashboard + profile save
├── style.css          # Login/signup styling
└── dashboard.css      # Movie grid styling
```

## 🚀 Setup

### 1. Firebase Configuration

**Project 1: Firebase Authentication**
- Enable Email/Password authentication
- Used in: `app.js` and `dashboard.js`

**Project 2: Firestore Database**
- Create `"sign up"` collection
- Used in: `signup.js`

### 2. Update Firebase Config

Replace `firebaseConfig` in all three JS files:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
```

### 3. Run with Live Server

- Open project in VS Code
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"
- **Important**: Must use local server for ES modules to work

## 🎬 Dashboard

The dashboard (`dashboard.html`) is just a movie-like structure:
- 4-column responsive grid (adapts to mobile)
- 20 placeholder movie cards
- Green accent color (#6ac045)
- Dark theme (#171717 background)
- Search bar (UI only)
- VPN warning banner at bottom

**Note**: Movie data is hardcoded - no actual movie database integration.

## 🔄 Approval Process

1. User signs up → Data saved to Firestore
2. Check Firestore Console → `"sign up"` collection → See their email/password
3. Go to Firebase Authentication → "Add user" → Enter their email/password
4. Now they can login on `index.html`

## ⚠️ Security Note

This setup stores passwords in **plain text** in Firestore. This is intentional for your admin approval workflow, but it's not recommended for production apps with sensitive data.

## 📝 Files Explained

| File | Purpose |
|------|---------|
| `app.js` | Handles login with Firebase Auth + auto-redirect to dashboard |
| `signup.js` | Saves signup data to Firestore (admin can review) |
| `dashboard.js` | Protects dashboard page + saves user profiles to Firestore |
| `style.css` | Glassmorphic login/signup styling with animated background |
| `dashboard.css` | Movie grid layout, navbar, and dark theme |

## 🎨 Design Features

- **Animated gradient background**: Purple/blue shifting colors
- **Glassmorphism**: Frosted glass effect on login containers
- **Neon cyan accents**: #00ffff for buttons and links
- **Green brand color**: #6ac045 for movie portal
- **Responsive**: Works on desktop, tablet, and mobile

## 👤 Author

[Your Name] - [Your GitHub](https://github.com/yourusername)

## 📄 License

MIT License - feel free to use and modify!

---

**Made with VS Code Live Server + Firebase** 🔥
