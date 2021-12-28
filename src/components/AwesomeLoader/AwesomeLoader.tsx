/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import palette from '../../lib/palette';

function AwesomeLoader() {
    return (
        <div css={wrapperStyle}>
            <div css={backGroundStyle}>
                <div css={loadingStyle}></div>
            </div>
        </div>
    );
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
    position: relative;
    top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    text-align: center;
    width: 379px;
    height: 299px;
    z-index: 10;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    border: 3px solid ${palette.blueGrey[400]};
    border-top: 3px solid rgba(49, 120, 198, 0.332);
    animation: ${spin} 1s linear infinite;
`;

const backGroundStyle = css`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const wrapperStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;
