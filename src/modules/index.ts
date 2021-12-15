import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ThemeSwitchReducer from './ThemeSwitch';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['ThemeSwitchReducer'],
};

const rootReducers = combineReducers({
    ThemeSwitchReducer,
});

export default persistReducer(persistConfig, rootReducers);
