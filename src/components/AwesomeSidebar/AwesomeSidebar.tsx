/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { logo_dark, logo_light } from '../../assets/images';
import ThemeSwitchBtn from '../ThemeSwitchBtn';
import SidebarItem from '../SidebarItem/SidebarItem';
import GoogleLoginButton from '../GoogleLoginButton';
import media from '../../lib/styles/media';
import palette from '../../lib/palette';
import { useSelector } from 'react-redux';
import { RootReducerType } from '../..';
import CurrentUserInfo from '../CurrentUserInfo';
import { useScroll } from '../../hooks/useScroll';
import { useEffect, useRef, useState } from 'react';
import { font } from '../../lib/styles/font';

function AwesomeSidebar() {
    const { scrollY } = useScroll();
    const navRef = useRef<HTMLImageElement>(null);
    const [navBarHeight, setNavBarHeight] = useState(0);

    const { isUser } = useSelector((state: RootReducerType) => state.UserSetReducer);
    const { isDarkMode } = useSelector((state: RootReducerType) => state.ThemeSwitchReducer);

    useEffect(() => {
        if (!navRef.current) return;
        setNavBarHeight(navRef.current?.getBoundingClientRect().height);
    }, []);

    return (
        <div css={sidebarStyle(scrollY, navBarHeight)}>
            <div className="logo">
                <Link to="/">{isDarkMode ? <img src={logo_dark} alt="logo" ref={navRef} /> : <img src={logo_light} alt="logo" ref={navRef} />}</Link>
            </div>
            <ul css={menuStyle}>
                <SidebarItem icon="workspace" text="Write" to="/write" />
                <SidebarItem icon="flask" text="Log" to="/log" />
                <SidebarItem icon="plus" text="Plus" to="/guestbook" />
                <ThemeSwitchBtn icon="globe" mode="side" />
            </ul>
            {isUser ? <CurrentUserInfo /> : <GoogleLoginButton />}
        </div>
    );
}

const sidebarStyle = (scrollY: number, navBarHeight: number) => css`
    ${media.xlarge} {
        margin-left: -30px;
    }
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;

    .logo {
        position: absolute;
        top: -18px;
        width: 118%;
        font-weight: bold;
        font-size: ${font.xLarge}
        color: ${palette.blueGrey[900]};
        transition: 0.25s ease-in-out;
        transform: ${scrollY > navBarHeight ? 'translateY(-100px)' : ''};
        img {
            display: block;
        }
    }

    & > .logo:hover {
        color: ${palette.blueGrey[900]};
    }

    ${media.small} {
        .logo {
            font-size: ${font.mobileXLarge} !important;
        }
    }
`;

const menuStyle = css`
    list-style: none;
    padding: 0;
    margin-top: 5.625rem;
    flex: 1;
`;

export default AwesomeSidebar;
