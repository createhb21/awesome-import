/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { logo } from '../../assets/images';
import palette from '../../lib/palette';
import media from '../../lib/styles/media';
import SidebarItem from '../SidebarItem/SidebarItem';

export type SidebarProps = {};

function Sidebar({}: SidebarProps) {
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
            </ul>
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
        width: 19%;
        font-weight: bold;
        font-size: 1.5rem;
        color: ${palette.blueGrey[900]};
        img {
            display: block;
        }
    }
`;

const menuStyle = css`
    list-style: none;
    padding: 0;
    margin-top: 3.925rem;
    margin-left: -1rem;
    flex: 1;
`;

export default Sidebar;
