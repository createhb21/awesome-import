/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import media from '../../lib/styles/media';
import MobileFooterItem from './MobileFooterItem';
export type MobileFooterProps = {};

function MobileFooter({}: MobileFooterProps) {
    return (
        <>
            <footer css={[common, footerStyle]}>
                <MobileFooterItem icon="workspace" text="Write" to="/write" />
                <MobileFooterItem icon="flask" text="Log" to="/log" />
                <MobileFooterItem icon="globe" text="Explore" to="/explore" />
            </footer>
            <div css={[common]}></div>
        </>
    );
}

const common = css`
    display: none;
    ${media.small} {
        display: flex;
    }
    height: 4rem;
    width: 100%;
`;
const footerStyle = css`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 30;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.125);
    background: white;
`;

export default MobileFooter;
