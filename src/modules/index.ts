import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import FetchGuestBookReducer from './Fetch/FetchGuestBook';
import FetchLogReducer from './Fetch/FetchLogData';
import FetchPostReducer from './Fetch/FetchPostData';
import ImageSetterReducer from './ImageSetter';
import ThemeSwitchReducer from './ThemeSwitch';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['ThemeSwitchReducer'],
};

const rootReducers = combineReducers({
    ImageSetterReducer,
    ThemeSwitchReducer,
    FetchPostReducer,
    FetchLogReducer,
    FetchGuestBookReducer,
});

export default persistReducer(persistConfig, rootReducers);
