// js/firebase-config.js

// TODO: Ganti konfigurasi di bawah ini dengan firebaseConfig dari Firebase Console Anda!
const firebaseConfig = {
    apiKey: "AIzaSyDummyKey-GantiDenganMilikAnda",
    authDomain: "project-id.firebaseapp.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();

console.log("Firebase initialized.");
