/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ITheme } from './Theme';

export const GlobalStyle = (theme: ITheme) => css`
    body {
        background-color: ${theme.background};
        color: ${theme.text};
        transition-duration: 0.3s;
        transition-property: background-color, color;
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 나눔고딕, 'Nanum Gothic', 'Noto Sans KR', 'Noto Sans CJK KR', arial, 돋움,
            Dotum, Tahoma, Geneva, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
        vertical-align: baseline;

        /* Light mode */
        @media (prefers-color-scheme: light) {
            html {
                background: white;
                color: black;
            }
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
            html {
                background: black;
                color: white;
            }
        }
    }

    * {
        box-sizing: border-box;
    }

    *::-webkit-scrollbar {
        width: 0px;
        background: none;
    }

    *::-webkit-scrollbar-track {
        background: none;
    }

    code {
        font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    input,
    button,
    textarea {
        font-family: inherit;
    }

    html,
    body,
    #root {
        height: 100%;
    }

    img {
        vertical-align: top;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;

export default GlobalStyle;
