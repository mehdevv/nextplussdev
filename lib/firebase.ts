import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.APP_FB_AK!,
  authDomain: process.env.APP_FB_AD!,
  projectId: process.env.APP_FB_PID!,
  storageBucket: process.env.APP_FB_SB!,
  messagingSenderId: process.env.APP_FB_MSID!,
  appId: process.env.APP_FB_AID!
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage } 