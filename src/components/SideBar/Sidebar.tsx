/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { logo } from '../../assets/images';
import ThemeSwitchBtn from '../ThemeSwitchBtn';
import SidebarItem from '../SidebarItem/SidebarItem';
import GoogleLoginButton from '../GoogleLoginButton';
import media from '../../lib/styles/media';
import palette from '../../lib/palette';
import { useSelector } from 'react-redux';
import { RootReducerType } from '../..';
import CurrentUserInfo from '../CurrentUserInfo';

function SideBar() {
    const { isUser } = useSelector((state: RootReducerType) => state.UserSetReducer);

    return (
        <div css={sidebarStyle}>
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
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

const sidebarStyle = css`
    ${media.xlarge} {
        display: none;
    }
    flex: 1;
    display: flex;
    flex-direction: column;

    .logo {
        width: 50px;
        font-weight: bold;
        font-size: 1.5rem;
        margin-left: 9.5px;
        color: ${palette.blueGrey[900]};
        img {
            display: block;
        }
    }
`;

const menuStyle = css`
    list-style: none;
    padding: 0;
    margin-top: 5.625rem;
    flex: 1;
`;

export default SideBar;
