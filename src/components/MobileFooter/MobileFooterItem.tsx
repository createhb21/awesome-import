/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { NavLink } from 'react-router-dom';
import palette from '../../lib/palette';
import Awesomecon, { AwesomeIconType } from '../Awesomecon/Awesomecon';

export type MobilerFooterItemProps = {
    icon: AwesomeIconType;
    text: string;
    to: string;
    ignore?: boolean;
};

function MobileFooterItem({ icon, text, to }: MobilerFooterItemProps) {
    return (
        <NavLink to={to} css={item}>
            <Awesomecon name={icon} />
        </NavLink>
    );
}

const item = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    &:hover {
        background: ${palette.blueGrey[50]};
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
