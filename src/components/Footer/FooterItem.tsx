/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import palette from '../../lib/palette';
import Awesomecon, { AwesomeIconType } from '../Awesomecon/Awesomecon';
import { ITheme } from '../../lib/styles/Theme';
import { font } from '../../lib/styles/font';
import media from '../../lib/styles/media';

export type FooterItemProps = {
    icon: AwesomeIconType;
    to: string;
};

function FooterItem({ icon, to }: FooterItemProps) {
    const theme = useTheme();
    return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a href={to} target="_blank" css={item(theme)}>
            <Awesomecon name={icon} />
        </a>
    );
}

const item = (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    &:hover {
        color: ${theme.primaryColor};
        transition: 0.55s;
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

    color: ${palette.blueGrey[400]};

    &.active {
        color: ${palette.cyan[600]};
        border-radius: 0.25rem;
    }

    ${media.small} {
        span {
            font-size: ${font.mobileXSmall} !important;
        }
    }
`;

export default FooterItem;
