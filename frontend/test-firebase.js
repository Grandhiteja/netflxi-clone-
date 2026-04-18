import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoKMFJEwEyMRY_gQqVnkbxHTzHXZml2lw",
  authDomain: "netflix-clone-c54d0.firebaseapp.com",
  projectId: "netflix-clone-c54d0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

createUserWithEmailAndPassword(auth, "testuser" + Math.random() + "@test.com", "password123")
  .then((userCredential) => {
    console.log("Success!", userCredential.user.uid);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Firebase Error:", error.code, error.message);
    process.exit(1);
  });
