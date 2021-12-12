import { Dispatch } from 'redux';

const NO_PREVIOUS = 'NO_PREVIOUS';
const NO_NEXT = 'NO_NEXT';

interface previousNodeDispatch {
    type: typeof NO_PREVIOUS;
}
interface nextNodeDispatch {
    type: typeof NO_NEXT;
}

type CheckPostLoopBtnType = previousNodeDispatch | nextNodeDispatch;

export const checkPreviousNode = () => (dispatch: Dispatch<previousNodeDispatch>) => {
    dispatch({
        type: NO_PREVIOUS,
    });
};
export const checkNextNode = () => (dispatch: Dispatch<nextNodeDispatch>) => {
    dispatch({
        type: NO_NEXT,
    });
};

export interface InitialState {
    isPrevious: boolean;
    isNext: boolean;
}

const initialState: InitialState = {
    isPrevious: true,
    isNext: true,
};

const CheckPostLoopBtnReducer = (state = initialState, action: CheckPostLoopBtnType): InitialState => {
    switch (action.type) {
        case NO_PREVIOUS:
            return {
                ...state,
                isPrevious: false,
            };
        case NO_NEXT:
            return {
                ...state,
                isNext: false,
            };
        default:
            return state;
    }
};

export default CheckPostLoopBtnReducer;
