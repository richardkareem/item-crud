// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJundaTD2ahAGDXA-ImYmULyrMr5y9GDA",
  authDomain: "firestore-latihan.firebaseapp.com",
  projectId: "firestore-latihan",
  storageBucket: "firestore-latihan.appspot.com",
  messagingSenderId: "472924375599",
  appId: "1:472924375599:web:5ceeba568aec073622d4da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);