// js/firebase-config.js

const firebaseConfig = {
  projectId: "classhub-v3-frizzads",
  appId: "1:142336807236:web:0e27dcc3f97e99edd44711",
  storageBucket: "classhub-v3-frizzads.firebasestorage.app",
  apiKey: "AIzaSyCHQugS8mAX7RTqcq-I_3oibp3vcpOTq1E",
  authDomain: "classhub-v3-frizzads.firebaseapp.com",
  messagingSenderId: "142336807236"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();

console.log("Firebase initialized.");
