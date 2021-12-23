import draftToHtml from 'draftjs-to-html';
import { child, getDatabase, push, ref, set } from 'firebase/database';
import moment from 'moment';
import firebaseApp from '../lib/storage/firebase';

export const FirebasePosting = (dir: string, postingData: any) => {
    const db = getDatabase(firebaseApp);
    const newData = ref(db, dir);
    const newCommentRef = push(newData);

    const request = set(newCommentRef, postingData)
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log(error);
        });
    return request;
};

export const writePostCreateApi = async (category: any, title: any, data: any, img?: any) => {
    const db = getDatabase(firebaseApp);
    const newPostKey = push(child(ref(db), 'write/posts')).key;
    const commentMoment = moment().format('YYYY년MM월DD일 HH:mm');

    const postingData = {
        category,
        title,
        body: data,
        img,
        date: commentMoment,
        starCount: 0,
        id: newPostKey,
    };

    await FirebasePosting('write/posts', postingData).then(() => {
        console.log('success');
    });
};

// export const logPostCreateApi = async (data: any) => {
//     const db = getDatabase(firebaseApp);
//     const newPostKey = push(child(ref(db), 'guestbook')).key;
//     const commentMoment = moment().format('YYYY년MM월DD일 HH:mm:ss');
//     const formatData = draftToHtml(data);
//     const userName = nickNameRef.current && nickNameRef.current.value;
//     const password = pwRef.current && pwRef.current.value;

//     const commentData = {
//         userName,
//         password,
//         body: formatData,
//         date: commentMoment,
//         starCount: 0,
//         id: newPostKey,
//     };

//     if (!(userName == '') && !(password == '') && !(data.blocks[0].text == '')) {
//         await FirebasePosting('guestbook', commentData).then(() => {
//             if (nickNameRef.current && pwRef.current) {
//                 nickNameRef.current.value = '';
//                 pwRef.current.value = '';
//             }
//         });
//     } else {
//         alert('내용을 모두 입력해주세요 :D');
//     }
// };

export const guestBookCommentCreateApi = async (data: any, nickNameRef: any, pwRef: any) => {
    const db = getDatabase(firebaseApp);
    const newPostKey = push(child(ref(db), 'guestbook')).key;
    const commentMoment = moment().format('YYYY년MM월DD일 HH:mm:ss');
    const formatData = draftToHtml(data);
    const userName = nickNameRef.current && nickNameRef.current.value;
    const password = pwRef.current && pwRef.current.value;

    const commentData = {
        userName,
        password,
        body: formatData,
        date: commentMoment,
        starCount: 0,
        id: newPostKey,
    };

    if (!(userName == '') && !(password == '') && !(data.blocks[0].text == '')) {
        await FirebasePosting('guestbook', commentData).then(() => {
            if (nickNameRef.current && pwRef.current) {
                nickNameRef.current.value = '';
                pwRef.current.value = '';
            }
        });
    } else {
        alert('내용을 모두 입력해주세요 :D');
    }
};
