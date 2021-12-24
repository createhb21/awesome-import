/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { logo } from '../../assets/images';
import ThemeSwitchBtn from '../ThemeSwitchBtn';
import AuthServiece from '../../hooks/authServiece';
import SidebarItem from '../SidebarItem/SidebarItem';
import { useState } from 'react';

function SideBar() {
    const [visible, setVisible] = useState(false);

    const userIn = async () => {
        await AuthServiece.login() //
            .then(result => {
                setVisible(false);
                const user = result.user;
                const userName = user.displayName! as string;
                localStorage.setItem('uid', user.uid);
                localStorage.setItem('displayName', userName);
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    };

    const userOut = async () => {
        await AuthServiece.logout().then(() => {
            setVisible(true);
            localStorage.removeItem('uid');
            localStorage.removeItem('displayName');
        });
    };

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
                {visible ? <button onClick={userIn}>login</button> : <button onClick={userOut}>logout</button>}
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

export default SideBar;
