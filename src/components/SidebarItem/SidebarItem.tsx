/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import palette from '../../lib/palette';
import { NavLink } from 'react-router-dom';
import AwesomeIcon, { AwesomeIconType } from '../Awesomecon/Awesomecon';
import { ITheme } from '../../lib/styles/Theme';
import { font } from '../../lib/styles/font';
import media from '../../lib/styles/media';

export type SidebarItemProps = {
    icon: AwesomeIconType;
    text: string;
    to: string;
};

function SidebarItem({ icon, text, to }: SidebarItemProps) {
    return (
        <li>
            <NavLink to={to} css={linkStyle}>
                <AwesomeIcon name={icon} />
                <span>{text}</span>
            </NavLink>
        </li>
    );
}

const linkStyle = (theme: ITheme) => css`
    border-radius: 0.5rem;
    height: 3.75rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    color: ${palette.blueGrey[400]};
    text-decoration: none;

    &:hover {
        background: ${theme.buttonBgHover};
        color: ${palette.cyan[600]};
        transition: 0.5s;
        transition-property: color;
    }
    svg {
        width: 1.75rem;
        height: 1.75rem;
    }
    span {
        font-size: ${font.Large};
        margin-left: 1rem;
    }

    &.active {
        background: ${theme.buttonBgHover};
        color: ${palette.cyan[600]};
        span {
            font-weight: bold;
        }
    }

    ${media.small} {
        span {
            font-size: ${font.mobileLarge} !important;
        }
    }
`;

export default SidebarItem;
