/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

function Footer() {
    return (
        <React.Fragment>
            <div css={copyrightStyle}>© 2021 Cretehb21.</div>
        </React.Fragment>
    );
}

const copyrightStyle = css`
    display: none;
    font-size: 0.875rem;
    line-height: 1.25rem;
`;

export default Footer;
