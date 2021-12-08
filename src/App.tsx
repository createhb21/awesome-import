import './App.css';
import Log from './pages/Log';
import Write from './pages/Write';
import Main from './pages/Home/main';
import { Global } from '@emotion/react';
import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './lib/styles/GlobalStyle';
import ThemeSwitchBtn from './components/ThemeSwitchBtn';
import { themeDark, themeLight } from './lib/styles/Theme';
import MobileHeader from './components/MobileHeader';
import MobileFooter from './components/MobileFooter';
import ArrowUpBtn from './components/ArrowUpBtn';
import AppLayout from './components/AppLayout';
import Sidebar from './components/Sidebar';

function App() {
    const [isDark, setIsDark] = useState(false);

    return (
        <ThemeProvider theme={isDark ? themeDark : themeLight}>
            <Global styles={GlobalStyle(isDark ? themeDark : themeLight)} />
            <ThemeSwitchBtn isDark={isDark} setIsDark={setIsDark} />
            <MobileHeader />
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
            <MobileFooter />
            <ArrowUpBtn icon="arrow_up" text="Arrow_up" />
        </ThemeProvider>
    );
}

export default App;
