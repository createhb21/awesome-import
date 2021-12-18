import { Dispatch } from 'redux';

export const createPromiseThunk = (type: any, promiseCreator: any) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return (param?: any, id?: number) => async (dispatch: Dispatch<any>) => {
        dispatch({ type, param });
        try {
            const payload = await promiseCreator(param, id);
            dispatch({ type: SUCCESS, payload });
        } catch (e) {
            dispatch({ type: ERROR, payload: e, error: true });
        }
    };
};

export const reducerUtils = {
    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null,
    }),
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: null,
    }),
    success: (payload: any) => ({
        loading: false,
        data: payload,
        error: null,
    }),
    error: (err: any) => ({
        loading: false,
        data: null,
        error: err,
    }),
};

export const handleAsyncActions = (type: any, key: string, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state: any, action: any) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(keepData ? state[key].data : null),
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload),
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload),
                };
            default:
                return state;
        }
    };
};
