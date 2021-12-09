/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { logo } from '../../assets/images';
import palette from '../../lib/palette';
import media from '../../lib/styles/media';
import { resetButton } from '../../lib/styles/resetButton';
import { ITheme } from '../../lib/styles/Theme';
import Awesomecon from '../Awesomecon';

function MobileHeader() {
    const theme = useTheme();
    return (
        <>
            <header css={[common, headerStyle(theme)]}>
                <Link to="/">
                    <img src={logo} className="logo" alt="logo" />
                </Link>
                <div css={headerRightWrapper}>
                    <div css={headerRight}>
                        <button css={loginButton}>
                            <Awesomecon name="user_circle" />
                        </button>
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
`;

const loginButton = css`
    ${resetButton}
    svg {
        width: 1.5rem;
        height: 1.5rem;
        color: ${palette.blueGrey[900]};
    }
`;
