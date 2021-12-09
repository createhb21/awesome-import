import { Dispatch } from 'redux';

const THEME_LIGHT = 'THEME_LIGHT';
const THEME_DARK = 'THEME_DARK';
interface themeLightDispatch {
    type: typeof THEME_LIGHT;
}
interface themeDarkDispatch {
    type: typeof THEME_DARK;
}
type ThemeDispatchType = themeLightDispatch | themeDarkDispatch;

export const switchThemeLight = () => (dispatch: Dispatch<themeLightDispatch>) => {
    dispatch({
        type: THEME_LIGHT,
    });
};
export const switchThemeDark = () => (dispatch: Dispatch<themeDarkDispatch>) => {
    dispatch({
        type: THEME_DARK,
    });
};

interface InitialState {
    isDarkMode: boolean;
}

const initialState: InitialState = {
    isDarkMode: true,
};

const ThemeSwitchReducer = (state = initialState, action: ThemeDispatchType): InitialState => {
    switch (action.type) {
        case THEME_LIGHT:
            return {
                ...state,
                isDarkMode: false,
            };
        case THEME_DARK:
            return {
                ...state,
                isDarkMode: true,
            };
        default:
            return state;
    }
};

export default ThemeSwitchReducer;
