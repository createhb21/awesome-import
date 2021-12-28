/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import React from 'react';
import media from '../../lib/styles/media';
import { ITheme } from '../../lib/styles/Theme';
import FooterItem from './FooterItem';

function Footer() {
    const theme = useTheme();
    const github = 'https://github.com/createhb21';
    const instagram = 'https://www.instagram.com/creathb21/';
    return (
        <React.Fragment>
            <div css={copyrightStyle}>© 2021 Cretehb21.</div>
            <div css={linkStyle}>
                <FooterItem icon="github" to={github} />
                <FooterItem icon="instagram" to={instagram} />
            </div>
        </React.Fragment>
    );
}

const copyrightStyle = css`
    font-size: 0.875rem;
    line-height: 1.25rem;
`;

const linkStyle = css`
    width: 70px;
    display: flex;
    justify-content: space-between;
`;

export default Footer;
