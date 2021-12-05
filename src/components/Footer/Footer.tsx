/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import palette from '../../lib/palette';
import media from '../../lib/styles/media';

export type FooterProps = {};

function Footer({}: FooterProps) {
    return (
        <>
            <div css={copyrightStyle}>© 2021 Cretehb21.</div>
            {/* <div>© 2021 Cretehb21.</div> */}
        </>
    );
}

const copyrightStyle = css`
    font-size: 0.875rem;
    line-height: 1.25rem;
`;

export default Footer;
