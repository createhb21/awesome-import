import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import firebaseApp from '../lib/storage/firebase';

function FirebaseFetch(dir: string) {
    const db = getDatabase(firebaseApp);
    const dirRef = ref(db, dir);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        onValue(dirRef, snapshot => {
            const fetchData = snapshot.val();
            if (fetchData !== data) {
                setData(data);
            }
        });
    }, []);

    return data;
}

export default FirebaseFetch;
