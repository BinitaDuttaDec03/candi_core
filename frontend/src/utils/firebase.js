import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "candi-core.firebaseapp.com",
    projectId: "candi-core",
    storageBucket: "candi-core.firebasestorage.app",
    messagingSenderId: "567306938747",
    appId: "1:567306938747:web:31aaf9fd4c596f349f35de",
    measurementId: "G-TB97LS214W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth, provider }