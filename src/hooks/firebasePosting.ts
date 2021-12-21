import { getDatabase, push, ref, set } from 'firebase/database';
import firebaseApp from '../lib/storage/firebase';

export const FirebasePosting = (dir: string, postingData: any) => {
    const db = getDatabase(firebaseApp);
    const commentList = ref(db, dir);
    const newCommentRef = push(commentList);

    set(newCommentRef, postingData)
        .then(() => {
            console.log('Data saved successfully!');
        })
        .catch(error => {
            console.log(error);
        });
};
