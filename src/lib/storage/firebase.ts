import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.AWESOME_FIREBASE_API_KEY,
    authDomain: process.env.AWESOME_FIREBASE_AUTHS_DOMAIN,
    projectId: process.env.AWESOME_FIREBASE_PROJECT_ID,
    storageBucket: process.env.AWESOME_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.AWESOME_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.AWESOME_FIREBASE_APP_ID,
    measurementId: process.env.AWESOME_FIREBASE_MESSAGING_SENDER_ID,
};

export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
