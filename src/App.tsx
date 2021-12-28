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
import { RootReducerType } from './index';

import AwesomeEditor from './components/AwesomeEditor/AwesomeEditor';
import GuestBook from './pages/GuestBook';
import Footer from './components/Footer';
import AwesomeSidebar from './components/AwesomeSidebar/AwesomeSidebar';

function App() {
    const { isDarkMode } = useSelector((state: RootReducerType) => state.ThemeSwitchReducer);
    return (
        <ThemeProvider theme={!isDarkMode ? themeLight : themeDark}>
            <MobileHeader />
            <AppLayout>
                <AppLayout.Side>
                    <AwesomeSidebar />
                </AppLayout.Side>
                <AppLayout.Main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/write" element={<Write />} />
                        <Route path="/write/:id" element={<WritePostDetail />} />
                        <Route path="/log" element={<Log />} />
                        <Route path="/guestbook" element={<GuestBook />} />
                        <Route path="/edit" element={<AwesomeEditor />} />
                    </Routes>
                    <AppLayout.Footer>
                        <Footer />
                    </AppLayout.Footer>
                </AppLayout.Main>
                <MobileFooter />
            </AppLayout>

            <ArrowUpBtn icon="arrow_up" text="Arrow_up" />
            <Global styles={GlobalStyle(!isDarkMode ? themeLight : themeDark)} />
        </ThemeProvider>
    );
}

export default App;
