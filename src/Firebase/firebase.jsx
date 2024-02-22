// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const apiKey = process.env.REACT_APP_API_KEY;
const appId = process.env.REACT_APP_APP_ID;
const measurementId = process.env.REACT_APP_MEASUREMENTID;
const messagingSenderId = process.env.REACT_APP_MESSAGINGSENDERID;

const firebaseConfig = {
  apiKey: "AIzaSyD6Q7MFq7sUqGTMHO4DTVUf-a0hZllgbz8",
  authDomain: "podcast-application-react.firebaseapp.com",
  projectId: "podcast-application-react",
  storageBucket: "podcast-application-react.appspot.com",
  messagingSenderId: "35641582772",
  appId: "1:35641582772:web:c521034ff245e7b5ec63e1",
  measurementId: "G-D3PL5H0LW8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
