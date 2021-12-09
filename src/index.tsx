import './index.css';
import App from './App';
import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export type RootReducerType = ReturnType<typeof rootReducer>;

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <Helmet>
                <title>@import</title>
            </Helmet>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
