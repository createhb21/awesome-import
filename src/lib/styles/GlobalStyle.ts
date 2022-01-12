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
        line-height: 1.625;
        font-family: -apple-system, 'Noto Sans KR', 'Apple SD Gothic Neo', 'Noto Sans CJK KR', BlinkMacSystemFont, 'Helvetica Neue', 'Malgun Gothic', '맑은 고딕', 'Nanum Gothic', arial, 돋움, Dotum,
            Tahoma, Geneva, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
        vertical-align: baseline;

        Light mode @media (prefers-color-scheme: light) {
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
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    pre {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
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

    li {
        display: list-item;
        text-align: -webkit-match-parent;
    }
    ol,
    ul {
        list-style: none;
    }
    blockquote,
    dd,
    dl,
    figure,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    p,
    pre {
        margin: 0;
    }
`;

export default GlobalStyle;
