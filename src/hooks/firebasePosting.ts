import moment from 'moment';
import { EditorState } from 'draft-js';
import firebaseApp from '../lib/storage/firebase';
import { WritePostType } from '../modules/Fetch/FetchPostData';
import { child, getDatabase, push, ref, set } from 'firebase/database';
import { linkDecorator } from '../components/AwesomeEditor/hooks/Link';

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

export const writePostCreateApi = async (categoryRef: any, titleRef: any, data: any, uid?: string) => {
    const commentMoment = moment().format('YYYY년 MM월 DD일 HH:mm');
    const category = categoryRef.current && categoryRef.current.value;
    const title = titleRef.current && titleRef.current.value;
    const formatData = JSON.stringify(data);

    const dataArr: any[] = [];
    for (let keys in data.entityMap) {
        dataArr.push(data.entityMap[keys]);
    }
    const formatImg = dataArr.find(content => content.type === 'image');
    const {
        data: { src },
    } = formatImg;

    const postingData: WritePostType = {
        uid,
        title,
        category,
        img: src,
        starCount: 0,
        body: formatData,
        date: commentMoment,
    };

    if (!(category === '') && !(title === '') && !(data.blocks[0].text === '')) {
        try {
            await FirebasePosting('write/posts', postingData).then(() => {
                console.log('success');
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        alert('내용을 모두 입력해주세요 :D');
    }
};

export const logPostCreateApi = async (titleRef: any, data: any, uid?: string) => {
    const commentMoment = moment().format('YYYY년 MM월 DD일 HH:mm');
    const title = titleRef.current && titleRef.current.value;
    const formatData = JSON.stringify(data);

    const postingData: any = {
        uid,
        title,
        body: formatData,
        date: commentMoment,
        starCount: 0,
    };

    if (!(title === '') && !(data.blocks[0].text === '')) {
        try {
            await FirebasePosting('log/posts', postingData).then(() => {
                console.log('success');
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        alert('내용을 모두 입력해주세요 :D');
    }
};

export const guestBookCommentCreateApi = async (data: any, nickNameRef: any, pwRef: any, setEditorState: any) => {
    const db = getDatabase(firebaseApp);
    const newPostKey = push(child(ref(db), 'guestbook')).key;
    const commentMoment = moment().format('YYYY년MM월DD일 HH:mm:ss');
    const initialState = EditorState.createEmpty(linkDecorator);

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

    if (!(userName === '') && !(password === '') && !(data.blocks[0].text === '')) {
        try {
            await FirebasePosting('guestbook', commentData).then(() => {
                nickNameRef.current.value = '';
                pwRef.current.value = '';
                setEditorState(initialState);
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        alert('내용을 모두 입력해주세요 :D');
    }
};
