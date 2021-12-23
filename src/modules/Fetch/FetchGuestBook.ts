import Axios from 'axios';
import { createPromiseThunk, reducerUtils, handleAsyncActions } from '../../hooks/asyncUtils';

const BASE_URL = (): string => {
    return `${process.env.REACT_APP_API_BASE_URL}/guestbook.json`;
};

export const GET_MESSAGES = 'GET_MESSAGES';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_ERROR = 'GET_MESSAGES_ERROR';

export interface MessageType {
    id: number;
    userName: string;
    password: number | string;
    date: string;
    body: any;
    starCount: number;
}

export const getMessages = async () => {
    const res = await Axios.get(BASE_URL());
    const posts = res.data;
    return posts;
};

export const getMsgAction = createPromiseThunk(GET_MESSAGES, getMessages);

const initialState = {
    posts: reducerUtils.initial(),
};

export default function FetchGuestBookReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_MESSAGES:
        case GET_MESSAGES_SUCCESS:
        case GET_MESSAGES_ERROR:
            return handleAsyncActions(GET_MESSAGES, 'posts', true)(state, action);
        default:
            return state;
    }
}
