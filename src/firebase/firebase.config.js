// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
   apiKey: "AIzaSyA71GxLl_UumvCkkZ0kjkxcl9QUeH4B1Oc",
  authDomain: "trustnet-otp.firebaseapp.com",
  projectId: "trustnet-otp",
  storageBucket: "trustnet-otp.firebasestorage.app",
  messagingSenderId: "667052001941",
  appId: "1:667052001941:web:72d7431864c5cf2512e99c",
  measurementId: "G-9XZ9NQGMRH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // 👈 this must match
const provider = new GoogleAuthProvider();

export { auth, provider , signInWithPopup };