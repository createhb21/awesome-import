/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import media from '../../lib/styles/media';

export type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <div css={containerStyle}>{children}</div>;
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
  return <footer css={footerStyle}>{children}</footer>;
}

export type MainProps = {
  children: React.ReactNode;
};

function Main({ children }: MainProps) {
  return <main css={mainStyle}>{children}</main>;
}

AppLayout.Side = Side;
AppLayout.Footer = Footer;
AppLayout.Main = Main;

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

const footerStyle = css`
  padding-left: 2rem;
  margin-left: 16.25rem;
  ${media.xlarge} {
    margin-left: 5rem;
  }
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  ${media.small} {
    margin-left: 0;
    padding: 0;
  }
  margin-top: 2.5rem;
  margin-right: auto;
  margin-left: auto;
  color: rgba(107, 114, 128, 0.41);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid rgba(49, 120, 198, 0.332);
`;

const mainStyle = css`
  padding-left: 2rem;
  margin-left: 16.25rem;
  ${media.xlarge} {
    margin-left: 5rem;
  }
  padding-top: 3rem;
  padding-bottom: 3rem;
  ${media.small} {
    margin-left: 0;
    padding: 0;
  }
`;

const containerStyle = css`
  outline: none;
  max-width: 1000px;
  max-height: 100vh;
  margin: 0 auto;
`;
