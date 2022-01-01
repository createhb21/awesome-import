import './index.css';
import App from './App';
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from 'redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { logo } from './assets/images';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);
export type RootReducerType = ReturnType<typeof rootReducer>;

const currentUrl = window.location.href;
ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <Helmet>
                <meta property="og:url" content={currentUrl} />
                <meta property="og:title" content="awesome import" />
                <meta property="og:description" content="Createhb21 • awesome import" />
                <meta property="og:image" content={logo} />
            </Helmet>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
