import { Global } from '@emotion/react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { Route, Routes, Navigate } from 'react-router-dom';
import GlobalStyle from './lib/styles/GlobalStyle';
import { themeDark, themeLight } from './lib/styles/Theme';
import MobileHeader from './components/MobileHeader';
import MobileFooter from './components/MobileFooter';
import WritePostDetail from './components/WritePostDetail';
import ArrowUpBtn from './components/ArrowUpBtn';
import AppLayout from './components/AppLayout';
import { RootReducerType } from './index';

import Log from './pages/Log';
import Write from './pages/Write';
import AwesomeEditor from './components/AwesomeEditor/AwesomeEditor';
import GuestBook from './pages/GuestBook';
import Footer from './components/Footer';
import AwesomeSidebar from './components/AwesomeSidebar/AwesomeSidebar';
import ShowBasedOnTags from './pages/TagsAndCategories/ShowBasedOnCateg';
import Header from './components/Header/Header';

function App() {
    const { isDarkMode } = useSelector((state: RootReducerType) => state.ThemeSwitchReducer);
    return (
        <ThemeProvider theme={!isDarkMode ? themeLight : themeDark}>
            <MobileHeader />
            <AppLayout>
                <AppLayout.Header>
                    <Header />
                </AppLayout.Header>
                <AppLayout.Side>
                    <AwesomeSidebar />
                </AppLayout.Side>
                <AppLayout.Main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dev" replace />} />
                        <Route path="/dev" element={<Write />} />
                        <Route path="/dev/:id" element={<WritePostDetail />} />
                        <Route path="/log" element={<Log />} />
                        <Route path="/guestbook" element={<GuestBook />} />
                        <Route path="/edit" element={<AwesomeEditor />} />
                        <Route path="/categories" element={<ShowBasedOnTags />} />
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
