// js/firebase-config.js

const firebaseConfig = {
  apiKey: "AIzaSyCzGtDKtV93I4eAj6NICmYSLGFrb8VYK7Y",
  authDomain: "clashub-b25b0.firebaseapp.com",
  projectId: "clashub-b25b0",
  storageBucket: "clashub-b25b0.firebasestorage.app",
  messagingSenderId: "652620989362",
  appId: "1:652620989362:web:a270fb87d13178978edaab",
  measurementId: "G-HFYSNJ95BF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();

console.log("Firebase initialized.");
