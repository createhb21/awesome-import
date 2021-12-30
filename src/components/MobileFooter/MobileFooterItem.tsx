/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import palette from '../../lib/palette';
import { NavLink } from 'react-router-dom';
import Awesomecon, { AwesomeIconType } from '../Awesomecon/Awesomecon';
import { ITheme } from '../../lib/styles/Theme';
import { font } from '../../lib/styles/font';
import media from '../../lib/styles/media';

export type MobilerFooterItemProps = {
    icon: AwesomeIconType;
    text: string;
    to: string;
    ignore?: boolean;
};

function MobileFooterItem({ icon, to }: MobilerFooterItemProps) {
    const theme = useTheme();
    return (
        <NavLink to={to} css={linkStyle(theme)}>
            <Awesomecon name={icon} />
        </NavLink>
    );
}

const linkStyle = (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${palette.blueGrey[400]};
    flex: 1;

    &:hover {
        color: ${palette.cyan[600]};
        transition: 0.5s;
        transition-property: color;
    }
    svg {
        width: 1.5rem;
        height: 1.5rem;
    }
    span {
        font-size: ${font.xSmall};
    }

    &.active {
        color: ${palette.cyan[600]};
    }

    ${media.small} {
        span {
            font-size: ${font.mobileXSmall} !important;
        }
    }
`;

export default MobileFooterItem;
