import Log from './pages/Log';
import Write from './pages/Write';
import HomePage from './pages/Home/HomePage';
import { Global } from '@emotion/react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './lib/styles/GlobalStyle';
import { themeDark, themeLight } from './lib/styles/Theme';
import MobileHeader from './components/MobileHeader';
import MobileFooter from './components/MobileFooter';
import WritePostDetail from './components/WritePostDetail';
import ArrowUpBtn from './components/ArrowUpBtn';
import AppLayout from './components/AppLayout';
import Sidebar from './components/Sidebar';
import { RootReducerType } from './index';

function App() {
    const { isDarkMode } = useSelector((state: RootReducerType) => state.ThemeSwitchReducer);

    return (
        <ThemeProvider theme={isDarkMode ? themeLight : themeDark}>
            <MobileHeader />
            <AppLayout>
                <AppLayout.Side>
                    <Sidebar />
                </AppLayout.Side>
                <AppLayout.Main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/write" element={<Write />} />
                        <Route path="/post/:id" element={<WritePostDetail />} />
                        <Route path="/log" element={<Log />} />
                    </Routes>
                </AppLayout.Main>
            </AppLayout>
            <MobileFooter />
            <ArrowUpBtn icon="arrow_up" text="Arrow_up" />
            <Global styles={GlobalStyle(isDarkMode ? themeLight : themeDark)} />
        </ThemeProvider>
    );
}

export default App;
