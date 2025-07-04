import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBBf54rRSFp0LkyZZrM7IAWelR3S-cbACg",
  authDomain: "plussdev-nextjs.firebaseapp.com",
  projectId: "plussdev-nextjs",
  storageBucket: "plussdev-nextjs.appspot.com",
  messagingSenderId: "421496696061",
  appId: "1:421496696061:web:0325692408d9c870402294"
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage } 