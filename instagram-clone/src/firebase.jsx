import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNAG2sptZDYIt6TJSXRthCOll2thdOFsE",
  authDomain: "nicolas-instagram-clone.firebaseapp.com",
  projectId: "nicolas-instagram-clone",
  storageBucket: "nicolas-instagram-clone.firebasestorage.app",
  messagingSenderId: "20169592988",
  appId: "1:20169592988:web:2ec808bbacbdabc9795d59",
  measurementId: "G-Y92CCTK3H9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

export { auth, db };
