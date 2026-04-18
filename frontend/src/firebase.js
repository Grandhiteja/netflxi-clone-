import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoKMFJEwEyMRY_gQqVnkbxHTzHXZml2lw",
  authDomain: "netflix-clone-c54d0.firebaseapp.com",
  projectId: "netflix-clone-c54d0",
  storageBucket: "netflix-clone-c54d0.firebasestorage.app",
  messagingSenderId: "1041497532123",
  appId: "1:1041497532123:web:bc1457aa9ee9e775214efe",
  measurementId: "G-X4677K1Z3B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
