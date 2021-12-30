/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../..';
import palette from '../../lib/palette';
import { font } from '../../lib/styles/font';
import media from '../../lib/styles/media';
import { ITheme } from '../../lib/styles/Theme';
import { switchThemeDark, switchThemeLight } from '../../modules/ThemeSwitch';
import Awesomecon, { AwesomeIconType } from '../Awesomecon/Awesomecon';

export type MobileThemeSwitchProps = {
    icon: AwesomeIconType;
};

function MobileThemeSwitch({ icon }: MobileThemeSwitchProps) {
    const theme = useTheme();
    const { isDarkMode } = useSelector((state: RootReducerType) => state.ThemeSwitchReducer);
    const dispatch = useDispatch();
    const switchTheme = () => {
        isDarkMode ? dispatch(switchThemeLight()) : dispatch(switchThemeDark());
    };

    return (
        <div css={item(theme)} onClick={switchTheme}>
            <Awesomecon name={icon} />
        </div>
    );
}

export default MobileThemeSwitch;

const item = (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${palette.blueGrey[400]};
    flex: 1;
    cursor: pointer;

    &:hover {
        color: ${palette.cyan[600]};
        /* background: ${theme.buttonBgHover}; */
        border-radius: 0.25rem;
        transition: 0.5s;
        transition-property: color;
    }
    svg {
        width: 1.5rem;
        height: 1.5rem;
    }
    text-decoration: none;
    span {
        font-size: ${font.xSmall};
    }

    ${media.small} {
        span {
            font-size: ${font.mobileXSmall} !important;
        }
    }
`;
