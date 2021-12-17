import { Dispatch } from 'redux';
import Axios from 'axios';

export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAIL = 'POST_FAIL';

export interface IPost {
    id: number;
    category: string;
    title: string;
    date: string;
    img: string;
    body: string;
    starCount: number;
}

export type PostType = Array<IPost> | any;

export interface postsFailDispatch {
    type: typeof POST_FAIL;
}

export interface postsSuccessDispatch {
    type: typeof POST_SUCCESS;
    payload: PostType;
}

export type postsDispatchType = postsFailDispatch | postsSuccessDispatch;

export const fetchPostData = (dataCategory: string) => async (dispatch: Dispatch<postsDispatchType>) => {
    try {
        const res = await Axios.get(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEVELOP_API_URL : process.env.REACT_APP_RELEASE_API_URL}/${dataCategory}.json`);
        const data = res.data.posts[1];

        dispatch({
            type: POST_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({ type: POST_FAIL });
    }
};

interface InitialState {
    success: boolean;
    posts?: IPost;
}

const initialState: InitialState = {
    success: false,
};

const FetchPostReducer = (state = initialState, action: postsDispatchType): InitialState => {
    switch (action.type) {
        case POST_FAIL:
            return {
                ...state,
                success: false,
            };
        case POST_SUCCESS:
            const { id, category, title, date, img, body, starCount } = action.payload;
            return {
                ...state,
                success: true,
                posts: {
                    id,
                    img,
                    category,
                    date,
                    title,
                    body,
                    starCount,
                },
            };
        default:
            return state;
    }
};

export default FetchPostReducer;
