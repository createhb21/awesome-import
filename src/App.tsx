import React from 'react';
import { Global, css } from '@emotion/react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './main';
import AppLayout from './components/AppLayout';
import Sidebar from './components/SideBar';

function App() {
    return (
        <>
            <AppLayout>
                <AppLayout.Side>
                    <Sidebar />
                </AppLayout.Side>
                <AppLayout.Main>
                    <Routes>
                        <Route path="/" element={<Main />} />
                    </Routes>
                </AppLayout.Main>
            </AppLayout>
            <Global styles={globalStyle} />
        </>
    );
}

export default App;

const globalStyle = css`
    html,
    body,
    #root {
        height: 100%;
    }
    html {
        box-sizing: border-box;

        * {
            box-sizing: inherit;
        }
    }
`;
