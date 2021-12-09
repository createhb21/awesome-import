/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import SidebarItem from '../SidebarItem/SidebarItem';
import ThemeSwitchBtn from '../ThemeSwitchBtn';
import { logo } from '../../assets/images';

function Sidebar() {
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
                <ThemeSwitchBtn icon="globe" />
            </ul>
        </div>
    );
}

const sidebarStyle = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    .logo {
        opacity: 0.785;
        width: 2.5rem;
        height: 2.5rem;
        margin-left: -0.5rem;
    }
`;

const menuStyle = css`
    list-style: none;
    padding: 0;
    margin-top: 5.325rem;
    margin-left: -1rem;
    flex: 1;
`;

export default Sidebar;
