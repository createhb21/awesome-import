/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../../assets/images';
import palette from '../../lib/palette';
import media from '../../lib/styles/media';
import { resetButton } from '../../lib/styles/resetButton';
import { ITheme } from '../../lib/styles/Theme';
import Awesomecon from '../Awesomecon';

function MobileHeader() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const inviteToGustBook = () => {
        !visible ? setVisible(true) : setVisible(false);
    };

    const routeGuestBook = () => {
        navigate('/guestbook');
        setVisible(false);
    };
    return (
        <>
            <header css={[common, headerStyle(theme)]}>
                <Link to="/">
                    <img src={logo} className="logo" alt="logo" />
                </Link>
                <div css={headerRightWrapper}>
                    <div css={headerRight}>
                        <button css={loginButton} onClick={inviteToGustBook}>
                            <Awesomecon name="user_circle" />
                        </button>
                        <div css={toggleStyle(theme, visible)} onClick={routeGuestBook}>
                            GustBook
                        </div>
                    </div>
                </div>
            </header>
            <div css={[common, headerPlacer]}></div>
        </>
    );
}

export default MobileHeader;

const common = css`
    display: none;
    ${media.small} {
        display: flex;
    }
    height: 4rem;
`;

const headerStyle = (theme: ITheme) => css`
    position: fixed;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: ${theme.buttonBg};
    z-index: 30;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.125);
    a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .logo {
        opacity: 0.785;
        width: 2.5rem;
        height: 2.5rem;
        margin-left: 1rem;
    }
`;

const headerPlacer = css`
    height: 4rem;
`;

const headerRightWrapper = css`
    position: absolute;
    top: 0;
    right: 0;
`;

const headerRight = css`
    display: flex;
    align-items: center;
    height: 4rem;
    padding-right: 1rem;
    position: relative;
`;

const loginButton = css`
    cursor: pointer;
    ${resetButton}
    svg {
        width: 1.5rem;
        height: 1.5rem;
        color: ${palette.blueGrey[900]};
    }
`;

const toggleStyle = (theme: ITheme, visible: boolean) => css`
    font-size: 0.875rem;
    position: absolute;
    display: flex;
    opacity: ${!visible ? 0 : 1};
    pointer-events: ${!visible ? 'none' : ''};
    justify-content: center;
    align-items: center;
    padding: 2px;
    left: -35px;
    bottom: -10px;
    width: 70px;
    color: ${palette.blueGrey[600]};
    border: 1px solid ${palette.blueGrey[600]};
    border-radius: 15px;
    cursor: pointer;
    transition-duration: 0.45s;
    transition-property: opacity;
`;
