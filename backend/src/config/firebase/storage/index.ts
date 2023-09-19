import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";

const firebaseCred = JSON.parse(process.env.FIREBASE as string);

const app = initializeApp({
	credential: cert(firebaseCred),
	storageBucket: process.env.FIREBASE_BUCKET as string
});

const storageApp = getStorage(app);
const firestore = getFirestore(app);

export { app, storageApp, firestore };
