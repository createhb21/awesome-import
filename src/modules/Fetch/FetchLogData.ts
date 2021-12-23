import Axios from 'axios';
import { createPromiseThunk, reducerUtils, handleAsyncActions } from '../../hooks/asyncUtils';

const BASE_URL = (): string => {
    return `${process.env.REACT_APP_API_BASE_URL}/log.json`;
};

export const GET_LOGS = 'GET_LOGS';
export const GET_LOGS_SUCCESS = 'GET_LOGS_SUCCESS';
export const GET_LOGS_ERROR = 'GET_LOGS_ERROR';

export interface LogType {
    id: number;
    title: string;
    date: string;
    body: any;
    starCount: number;
}

export const getLogs = async () => {
    const res = await Axios.get(BASE_URL());
    const posts = res.data.posts;
    return posts;
};

export const getLogsAction = createPromiseThunk(GET_LOGS, getLogs);

const initialState = {
    posts: reducerUtils.initial(),
};

export default function FetchLogReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_LOGS:
        case GET_LOGS_SUCCESS:
        case GET_LOGS_ERROR:
            return handleAsyncActions(GET_LOGS, 'posts', true)(state, action);
        default:
            return state;
    }
}
