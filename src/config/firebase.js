// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6WL03sjn4Nb7SYaUkNliw7PCz81UG89g",
  authDomain: "vite-contact-e7f8b.firebaseapp.com",
  projectId: "vite-contact-e7f8b",
  storageBucket: "vite-contact-e7f8b.appspot.com",
  messagingSenderId: "710009184375",
  appId: "1:710009184375:web:73164e9030d8040da72672"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);