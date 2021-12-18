import Axios from 'axios';
import { createPromiseThunk, reducerUtils, handleAsyncActions } from '../../hooks/asyncUtils';

const BASE_URL = (): string => {
    return `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEVELOP_API_URL : process.env.REACT_APP_RELEASE_API_URL}/write.json`;
};

export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR';
export const GET_POST = 'GET_POST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_ERROR = 'GET_POST_ERROR';

const CLEAR_POST = 'CLEAR_POST';

export interface PostType {
    id: number;
    category: string;
    title: string;
    date: string;
    img: string;
    body: any;
    starCount: number;
}

export const getPosts = async () => {
    const res = await Axios.get(BASE_URL());
    const posts = res.data.posts;
    return posts;
};

export const getPostById = async (id: number) => {
    const res = await Axios.get(BASE_URL());
    const posts = res.data.posts;
    const defaultUser = {};
    return posts[id] || defaultUser;
};

export const getPostsAction = createPromiseThunk(GET_POSTS, getPosts);
export const getPostAction = createPromiseThunk(GET_POST, getPostById);

export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
    posts: reducerUtils.initial(),
    post: reducerUtils.initial(),
};

export default function FetchPostReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return handleAsyncActions(GET_POST, 'post')(state, action);
        case CLEAR_POST:
            return {
                ...state,
                post: reducerUtils.initial(),
            };
        default:
            return state;
    }
}
