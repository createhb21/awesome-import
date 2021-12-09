/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import palette from '../../lib/palette';
import { NavLink } from 'react-router-dom';
import Awesomecon, { AwesomeIconType } from '../Awesomecon/Awesomecon';
import { ITheme } from '../../lib/styles/Theme';

export type MobilerFooterItemProps = {
    icon: AwesomeIconType;
    text: string;
    to: string;
    ignore?: boolean;
};

function MobileFooterItem({ icon, to }: MobilerFooterItemProps) {
    const theme = useTheme();
    return (
        <NavLink to={to} css={item(theme)}>
            <Awesomecon name={icon} />
        </NavLink>
    );
}

const item = (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    &:hover {
        background: ${theme.buttonBgHover};
    }
    svg {
        width: 1.5rem;
        height: 1.5rem;
    }
    text-decoration: none;
    span {
        font-size: 0.75rem;
    }

    color: ${palette.blueGrey[400]};

    &.active {
        color: ${palette.cyan[600]};
        border-radius: 0.25rem;
    }
`;

export default MobileFooterItem;
