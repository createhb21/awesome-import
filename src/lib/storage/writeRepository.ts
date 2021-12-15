import { database } from './firebase';

interface IPost {
    title: string;
    body: string;
    author: string;
    authorPic: string;
    starCount: number;
}

class WriteRepository {
    savePost(post: IPost) {
        const db = database;
    }
}
export default WriteRepository;
