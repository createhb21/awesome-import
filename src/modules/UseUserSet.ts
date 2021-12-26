import { Dispatch } from 'redux';
import AuthServiece from '../hooks/authServiece';

const USER_IN = 'USER_IN';
const USER_OUT = 'USER_OUT';
interface userLoginDispatch {
    type: typeof USER_IN;
    payload: any;
}
interface userLogoutDispatch {
    type: typeof USER_OUT;
}
type UserDispatchType = userLoginDispatch | userLogoutDispatch;

export const switchUserLogin = () => async (dispatch: Dispatch<userLoginDispatch>) => {
    const res = await AuthServiece.login();
    const user = res.user;

    dispatch({
        type: USER_IN,
        payload: user,
    });
};
export const switchUserLogout = () => (dispatch: Dispatch<userLogoutDispatch>) => {
    dispatch({
        type: USER_OUT,
    });
};

type UserInfo = {
    uid: string;
    displayName: string;
    photoURL: string;
};
interface InitialState {
    isUser: boolean;
    user?: UserInfo;
}

const initialState: InitialState = {
    isUser: false,
};

const UserSetReducer = (state = initialState, action: UserDispatchType): InitialState => {
    switch (action.type) {
        case USER_IN:
            const user = action.payload;
            return {
                ...state,
                isUser: true,
                user,
            };
        case USER_OUT:
            return {
                ...state,
                isUser: false,
            };
        default:
            return state;
    }
};

export default UserSetReducer;
