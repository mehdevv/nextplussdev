import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getAuth, Auth } from "firebase/auth"
import { getFirestore, Firestore } from "firebase/firestore"
import { getStorage, FirebaseStorage } from "firebase/storage"

// Check if Firebase config is available
const hasFirebaseConfig = 
  process.env.APP_FB_AK &&
  process.env.APP_FB_AD &&
  process.env.APP_FB_PID &&
  process.env.APP_FB_SB &&
  process.env.APP_FB_MSID &&
  process.env.APP_FB_AID

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null

if (hasFirebaseConfig) {
  const firebaseConfig = {
    apiKey: process.env.APP_FB_AK!,
    authDomain: process.env.APP_FB_AD!,
    projectId: process.env.APP_FB_PID!,
    storageBucket: process.env.APP_FB_SB!,
    messagingSenderId: process.env.APP_FB_MSID!,
    appId: process.env.APP_FB_AID!
  }

  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
} else {
  // In development, log a warning instead of crashing
  if (typeof window === 'undefined') {
    console.warn('Firebase configuration not found. Please set up environment variables: APP_FB_AK, APP_FB_AD, APP_FB_PID, APP_FB_SB, APP_FB_MSID, APP_FB_AID')
  }
}

export { app, auth, db, storage } 