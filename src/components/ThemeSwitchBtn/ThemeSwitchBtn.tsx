/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { ITheme } from '../../lib/styles/Theme';

export type ThemeSwitchBtnProps = {
    isDark: boolean;
    setIsDark: (arg0: boolean) => void;
};

function ThemeSwitchBtn({ isDark, setIsDark }: ThemeSwitchBtnProps) {
    const theme = useTheme();

    const changeThemeColor = () => {
        isDark ? setIsDark(false) : setIsDark(true);
    };
    return (
        <div css={buttonStyle(theme)} onClick={changeThemeColor}>
            <button css={themeStyle(theme)}>Change</button>
        </div>
    );
}

export default ThemeSwitchBtn;

const buttonStyle = (theme: ITheme) => css`
    position: fixed;
    top: 2.7rem;
    right: 16.5rem;
    width: 5.5rem;
    height: 5.5rem;
`;

const themeStyle = (theme: ITheme) => css`
    cursor: pointer;
    color: ${theme.text};
    background-color: ${theme.background};
    transition-duration: 0.3s;
    transition-property: background-color, color;
`;
