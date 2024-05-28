// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt2AGqUxd9BATtd0UPjO9JGuFWhpCDM1M",
  authDomain: "websiteproject-94c83.firebaseapp.com",
  projectId: "websiteproject-94c83",
  storageBucket: "websiteproject-94c83.appspot.com",
  messagingSenderId: "772583980660",
  appId: "1:772583980660:web:979a087891a278e5d8db21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export {db};