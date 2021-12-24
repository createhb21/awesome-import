/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import palette from '../../lib/palette';

export type AwesomeLoaderProps = {};

function AwesomeLoader({}: AwesomeLoaderProps) {
    return <div css={loadingStyle}></div>;
}

export default AwesomeLoader;

const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

const loadingStyle = css`
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    border: 3px solid ${palette.blueGrey[400]};
    border-top: 3px solid rgba(49, 120, 198, 0.332);
    animation: ${spin} 1s linear infinite;
`;
