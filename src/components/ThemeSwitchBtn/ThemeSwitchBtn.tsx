/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { RootReducerType } from '../..';
import { ITheme } from '../../lib/styles/Theme';
import { switchThemeDark, switchThemeLight } from '../../modules/ThemeSwitch';
import AwesomeIcon, { AwesomeIconType } from '../Awesomecon/Awesomecon';
import { useDispatch, useSelector } from 'react-redux';
import palette from '../../lib/palette';
import media from '../../lib/styles/media';

export type ThemeSwitchBtnProps = {
    icon: AwesomeIconType;
    mode?: string;
};

function ThemeSwitchBtn({ icon }: ThemeSwitchBtnProps) {
    const theme = useTheme();
    const { isDarkMode } = useSelector((state: RootReducerType) => state.ThemeSwitchReducer);
    const dispatch = useDispatch();
    const switchTheme = () => {
        isDarkMode ? dispatch(switchThemeLight()) : dispatch(switchThemeDark());
    };

    let text = isDarkMode ? 'LightMode' : 'DarkMode';
    return (
        <li>
            <span css={linkStyle(theme)} onClick={switchTheme}>
                <AwesomeIcon name={icon} />
                <span css={mediaStyle}>{text}</span>
            </span>
        </li>
    );
}

export default ThemeSwitchBtn;

const linkStyle = (theme: ITheme) => css`
    border-radius: 0.5rem;
    height: 3.75rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    color: ${palette.blueGrey[600]};
    text-decoration: none;
    cursor: pointer;

    &:hover {
        color: ${palette.cyan[600]};
        border-radius: 0.25rem;
        transition: 0.5s;
        transition-property: color;
    }

    svg {
        width: 1.75rem;
        height: 1.75rem;
    }
    span {
        font-size: 1.125rem;
        margin-left: 1rem;
    }

    &.active {
        background: ${palette.blueGrey[50]};
        color: ${palette.blueGrey[900]};
        span {
            font-weight: bold;
        }
    }
`;

const mediaStyle = css`
    ${media.small} {
        display: none;
    }
`;
