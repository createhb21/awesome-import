/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import media from '../../lib/styles/media';

export type FooterProps = {};

function Footer({}: FooterProps) {
    return (
        <>
            <div css={copyrightStyle}>© 2021 Cretehb21.</div>
        </>
    );
}

const copyrightStyle = css`
    display: none;
    font-size: 0.875rem;
    line-height: 1.25rem;
`;

export default Footer;
