import { css } from '@emotion/react';

export type FooterProps = {};

function Footer({}: FooterProps) {
  return (
    <>
      <div css={copyrightStyle}>© 2021 Cretehb21.</div>
    </>
  );
}

const copyrightStyle = css`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export default Footer;
