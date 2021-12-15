import { database } from './firebase';

interface IPost {
    author: string;
    body: string;
    title: string;
    starCount: number;
    authorPic: string;
}

class WriteRepository {
    savePost(post: IPost) {
        const db = database;
    }
}
export default WriteRepository;
