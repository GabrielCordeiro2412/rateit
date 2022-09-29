// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV6zoRAoKQn3NnRPNNEVN4CoL0NsABGY0",
  authDomain: "projetocp-4cecf.firebaseapp.com",
  projectId: "projetocp-4cecf",
  storageBucket: "projetocp-4cecf.appspot.com",
  messagingSenderId: "487895061351",
  appId: "1:487895061351:web:f1228f1dc7e47a2efad5c2",
  measurementId: "G-8T37R0GKKW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();

