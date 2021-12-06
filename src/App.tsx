import './App.css';
import React from 'react';
import Main from './pages/Home/main';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from '../src/lib/styles/GlobalStyles';
import ThemeChangeBtn from './components/ThemeChangeBtn';
import MobileHeader from './components/MobileHeader';
import ArrowUpBtn from './components/ArrowUpBtn';
import AppLayout from './components/AppLayout';
import Sidebar from './components/Sidebar';
import MobileFooter from './components/MobileFooter';
import Write from './pages/Write';
import Log from './pages/Log';

function App() {
  return (
    <>
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
      <ThemeChangeBtn icon="react" text="React" />
      <GlobalStyle />
    </>
  );
}

export default App;
