/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { font } from '../../lib/styles/font';
import media from '../../lib/styles/media';
import FooterItem from './FooterItem';

function Footer() {
    const github = 'https://github.com/createhb21';
    const instagram = 'https://www.instagram.com/creathb21/';
    return (
        <React.Fragment>
            <div css={copyrightStyle}>© 2021 Createhb21.</div>
            <div css={linkStyle}>
                <FooterItem icon="github" to={github} />
                <FooterItem icon="instagram" to={instagram} />
            </div>
        </React.Fragment>
    );
}

const copyrightStyle = css`
${media.small} {
    font-size: ${font.mobileSmall} !important;
}
    font-size: ${font.Small}
    line-height: 1.25rem;
`;

const linkStyle = css`
    width: 70px;
    display: flex;
    justify-content: space-between;
`;

export default Footer;
