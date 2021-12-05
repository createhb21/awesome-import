/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { logo } from '../../assets/images';
import palette from '../../lib/palette';
import media from '../../lib/styles/media';

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
                <li>Log</li>
                <li>Write</li>
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
    margin-top: 5.625rem;
    margin-left: -1rem;
    flex: 1;
`;

export default Sidebar;
