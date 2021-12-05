import React from 'react';
import { GlobalStyle } from '../src/lib/styles/GlobalStyles';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Home/main';
import AppLayout from './components/AppLayout';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
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
                <AppLayout.Footer>
                    <Footer />
                </AppLayout.Footer>
            </AppLayout>
            <GlobalStyle />
        </>
    );
}

export default App;
