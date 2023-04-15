// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV53Qc4SV-WJ8qHFNZShBlMupSsNRbeLw",
  authDomain: "cogsciexp-dce32.firebaseapp.com",
  projectId: "cogsciexp-dce32",
  storageBucket: "cogsciexp-dce32.appspot.com",
  messagingSenderId: "1071747078228",
  appId: "1:1071747078228:web:cb8e158c3a5f94240035c1",
  measurementId: "G-RE0YH81V7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };