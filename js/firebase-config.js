// js/firebase-config.js

const firebaseConfig = {
  projectId: "classhub-v2-frizzads",
  appId: "1:859966391353:web:79a89659dbd8d4ef6439e8",
  storageBucket: "classhub-v2-frizzads.firebasestorage.app",
  apiKey: "AIzaSyAXfKJvHGqPT43Jg2Axdic02qUqXAoAP2A",
  authDomain: "classhub-v2-frizzads.firebaseapp.com",
  messagingSenderId: "859966391353"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();

console.log("Firebase initialized.");
