import draftToHtml from 'draftjs-to-html';
import { child, getDatabase, push, ref, set } from 'firebase/database';
import moment from 'moment';
import { stringify } from 'querystring';
import firebaseApp from '../lib/storage/firebase';
import { WritePostType } from '../modules/Fetch/FetchPostData';

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

export const writePostCreateApi = async (categoryRef: any, titleRef: any, data: any, img?: any) => {
    const db = getDatabase(firebaseApp);
    const newPostKey = push(child(ref(db), 'write/posts')).key! as string;
    const commentMoment = moment().format('YYYY년 MM월 DD일 HH:mm');
    const category = categoryRef.current && categoryRef.current.value;
    const title = titleRef.current && titleRef.current.value;
    const formatData = JSON.stringify(data);

    const postingData: WritePostType = {
        category,
        title,
        body: formatData,
        img,
        date: commentMoment,
        starCount: 0,
        id: newPostKey,
    };

    if (!(category == '') && !(title == '') && !(data.blocks[0].text == '')) {
        await FirebasePosting('write/posts', postingData).then(() => {
            console.log('success');
        });
    } else {
        alert('내용을 모두 입력해주세요 :D');
    }
};

export const logPostCreateApi = async (title: any, data: any) => {
    const db = getDatabase(firebaseApp);
    const newPostKey = push(child(ref(db), 'log/posts')).key! as string;
    const commentMoment = moment().format('YYYY년 MM월 DD일 HH:mm');
    const formatData = JSON.stringify(data);

    const postingData: any = {
        title,
        body: formatData,
        date: commentMoment,
        starCount: 0,
        id: newPostKey,
    };

    await FirebasePosting('log/posts', postingData).then(() => {
        console.log('success');
    });
};

export const guestBookCommentCreateApi = async (data: any, nickNameRef: any, pwRef: any) => {
    const db = getDatabase(firebaseApp);
    const newPostKey = push(child(ref(db), 'guestbook')).key;
    const commentMoment = moment().format('YYYY년MM월DD일 HH:mm:ss');
    const formatData = JSON.stringify(data);
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
