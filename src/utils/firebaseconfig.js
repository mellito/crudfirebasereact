// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF_Ph4ArkuMRiaTNMUTbiOwXliop4CJH8",
  authDomain: "crudreactfirebase-91f00.firebaseapp.com",
  projectId: "crudreactfirebase-91f00",
  storageBucket: "crudreactfirebase-91f00.appspot.com",
  messagingSenderId: "721463086755",
  appId: "1:721463086755:web:08a84143f3119720243916",
};

// Initialize Firebase
const fireBaseAPP = initializeApp(firebaseConfig);

export { fireBaseAPP };
