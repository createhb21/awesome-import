import { getAuth, signInWithPopup } from 'firebase/auth';
import firebaseApp, { googleProvider } from '../lib/storage/firebase';

class AuthServiece {
    static async login() {
        const auth = getAuth(firebaseApp);
        return await signInWithPopup(auth, googleProvider);
    }

    static async logout() {
        const auth = getAuth(firebaseApp);
        await auth.signOut();
    }
}

export default AuthServiece;
