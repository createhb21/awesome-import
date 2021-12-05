import React from 'react';
import { Global, css } from '@emotion/react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Home/main';
import AppLayout from './components/AppLayout';
import Sidebar from './components/Sidebar';
import Write from './pages/Write';
import Log from './pages/Log';

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
                        <Route path="/write" element={<Write />} />
                        <Route path="/log" element={<Log />} />
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
