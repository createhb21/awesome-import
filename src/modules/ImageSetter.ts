import { Dispatch } from 'redux';

const IMAGE_SETTER = 'IMAGE_SETTER';
const IMAGE_GETTER = 'IMAGE_GETTER';
interface imageSetterDispatch {
    type: typeof IMAGE_SETTER;
}
interface imageGetterDispatch {
    type: typeof IMAGE_GETTER;
}
type ImageDispatchType = imageSetterDispatch | imageGetterDispatch;

export const switchImageSetterMode = () => (dispatch: Dispatch<imageSetterDispatch>) => {
    dispatch({
        type: IMAGE_SETTER,
    });
};
export const switchImageGetterMode = () => (dispatch: Dispatch<imageGetterDispatch>) => {
    dispatch({
        type: IMAGE_GETTER,
    });
};

interface InitialState {
    isSetterMode: boolean;
}

const initialState: InitialState = {
    isSetterMode: false,
};

const ImageSetterReducer = (state = initialState, action: ImageDispatchType): InitialState => {
    switch (action.type) {
        case IMAGE_SETTER:
            return {
                ...state,
                isSetterMode: true,
            };
        case IMAGE_GETTER:
            return {
                ...state,
                isSetterMode: false,
            };
        default:
            return state;
    }
};

export default ImageSetterReducer;
