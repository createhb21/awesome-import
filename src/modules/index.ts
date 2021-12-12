import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CheckPostLoopBtnReducer from './PostLoopBtn';
import ThemeSwitchReducer from './ThemeSwitch';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['ThemeSwitchReducer'],
};

const rootReducers = combineReducers({
    ThemeSwitchReducer,
    CheckPostLoopBtnReducer,
});

export default persistReducer(persistConfig, rootReducers);
