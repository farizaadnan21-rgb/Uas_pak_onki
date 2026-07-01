// js/firebase-config.js
//
// CARA PAKAI:
// 1. Copy file ini dan rename menjadi "firebase-config.js"
// 2. Isi dengan credentials Firebase project Anda dari Firebase Console
// 3. Jangan pernah commit file firebase-config.js ke Git!

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();

console.log("Firebase initialized.");
