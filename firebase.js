
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyChnOH57EIvsbLn6vj8mryE8P6E2c-VnC4",
    authDomain: "apuntes-bef53.firebaseapp.com",
    projectId: "apuntes-bef53",
    storageBucket: "apuntes-bef53.firebasestorage.app",
    messagingSenderId: "655463239914",
    appId: "1:655463239914:web:f67b34a535ea73cda98793",
    measurementId: "G-DPL4FTJZFX"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
