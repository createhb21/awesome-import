/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import media from '../../lib/styles/media';
import { ITheme } from '../../lib/styles/Theme';

export type AppLayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <div css={containerStyle}>{children}</div>;
}

export type HeaderProps = {
    children: React.ReactNode;
};

function Header({ children }: HeaderProps) {
    return <header css={headerStyle}>{children}</header>;
}

export type SideProps = {
    children: React.ReactNode;
};

function Side({ children }: SideProps) {
    return <aside css={sidebarStyle}>{children}</aside>;
}

export type FooterProps = {
    children: React.ReactNode;
};
function Footer({ children }: FooterProps) {
    const theme = useTheme();
    return <footer css={footerStyle(theme)}>{children}</footer>;
}

export type MainProps = {
    children: React.ReactNode;
};

function Main({ children }: MainProps) {
    return <main css={mainStyle}>{children}</main>;
}

AppLayout.Header = Header;
AppLayout.Side = Side;
AppLayout.Footer = Footer;
AppLayout.Main = Main;

const headerStyle = css`
    width: 10rem;
    height: auto;
    display: flex;
    margin-left: 46.25rem;
    ${media.small} {
        display: none;
    }
`;
const sidebarStyle = css`
    width: 16.25rem;
    height: 100%;
    position: fixed;
    display: flex;
    padding-top: 3rem;
    padding-bottom: 3rem;
    padding-left: 3rem;
    ${media.xlarge} {
        width: 5rem;
        padding-top: 3rem;
    }
    ${media.small} {
        display: none;
    }
`;

const footerStyle = (theme: ITheme) => css`
    ${media.small} {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
    width: 100%;
    padding: 1rem;
    padding-top: 1.8rem;
    margin-top: 2.5rem;
    margin-right: auto;
    margin-left: auto;
    color: ${theme.textGray};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid ${theme.primaryColor};
`;

const mainStyle = (theme: ITheme) => css`
    ${media.xlarge} {
        margin-left: 11.5rem;
    }
    ${media.small} {
        margin-left: 0;
        padding: 0;
    }
    padding-left: 2rem;
    margin-left: 16.25rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
`;

const containerStyle = css`
    outline: none;
    max-width: 1000px;
    max-height: 100%;
    margin: 0 auto;
`;
