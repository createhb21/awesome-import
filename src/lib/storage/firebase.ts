import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCv7N7B1DdCvEJCpmd7sedWQIW9Uu69j_8',
    authDomain: 'awesome-import.firebaseapp.com',
    databaseURL: 'https://awesome-import-default-rtdb.firebaseio.com',
    storageBucket: 'awesome-import.appspot.com',
};

export const googleProvider = new GoogleAuthProvider();

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
