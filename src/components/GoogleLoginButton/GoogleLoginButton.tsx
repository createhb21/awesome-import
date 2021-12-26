/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import palette from '../../lib/palette';
import { resetButton } from '../../lib/styles/resetButton';
import { ITheme } from '../../lib/styles/Theme';
import { switchUserLogin } from '../../modules/UseUserSet';
import Awesomecon from '../Awesomecon';

export type GoogleLoginButtonProps = {};

function GoogleLoginButton({}: GoogleLoginButtonProps) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const userIn = async () => {
        dispatch(switchUserLogin());
    };

    return (
        <button css={buttonStyle(theme)} onClick={userIn}>
            <Awesomecon name="google" />
            Sign in with Google
        </button>
    );
}

const buttonStyle = (theme: ITheme) => css`
    ${resetButton}
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.text};
    background: ${theme.background};
    height: 3.375rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: ${theme.textGray};
    border-radius: 0.5rem;

    cursor: pointer;
    svg {
        margin-right: 0.5rem;
    }
    transition: all ease-in 0.125s;
    &:hover {
        box-shadow: 0px 0.25rem 0.5rem rgb(0 0 0 / 11%);
    }
`;

export default GoogleLoginButton;
