/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useScroll } from '../../hooks/useScroll';
import { brandColor } from '../../lib/palette';
import media from '../../lib/styles/media';
import { ITheme } from '../../lib/styles/Theme';
import AwesomeIcon, { AwesomeIconType } from '../Awesomecon/Awesomecon';

export type ArrowUpBtnProps = {
    icon: AwesomeIconType;
    text?: string;
};

function ArrowUpBtn({ icon, text }: ArrowUpBtnProps) {
    const theme = useTheme();
    const { scrollY } = useScroll();

    const scrollIntoTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div css={buttonStyle(scrollY, theme)} onClick={scrollIntoTop}>
            <AwesomeIcon name={icon} />
        </div>
    );
}

export default ArrowUpBtn;

const buttonStyle = (scrollY: number, theme: ITheme) => css`
    ${media.small} {
        right: 1rem;
        bottom: 5rem;
        background-color: ${brandColor};
        z-index: 30;
    }
    width: 3rem;
    bottom: 2rem;
    right: 2rem;
    height: 3rem;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 1, 0 0 transparent, 1, 0 0 transparent, #d1d1d142;
    position: fixed;
    justify-content: center;
    align-items: center;
    display: inline-flex;
    cursor: pointer;
    border-radius: 9999px;
    background-color: ${theme.primaryColor};
    opacity: ${scrollY >= 300 ? 1 : 0};
    pointer-events: ${scrollY >= 300 ? 'auto' : 'none'};
`;
