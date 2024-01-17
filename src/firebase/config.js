// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, TwitterAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    // apiKey: "AIzaSyCYVL-G03uLaJG88pnrDCfA1iFBSeRM4ZA",
    authDomain: "fir-cf9de.firebaseapp.com",
    projectId: "fir-cf9de",
    storageBucket: "fir-cf9de.appspot.com",
    messagingSenderId: "773235434205",
    appId: "1:773235434205:web:02f9ba328f988d6afbf134",
    measurementId: "G-R3RGB48JX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app);