/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useState } from 'react';
import CopyClipboard from '../../hooks/copyClipboard';
import media from '../../lib/styles/media';
import { ITheme } from '../../lib/styles/Theme';
import AwesomeRenderer from '../AwesomeRenderer';

export type MessageCardProps = {
    post: any;
};

function MessageCard({ post }: MessageCardProps) {
    const theme = useTheme();

    const [slideImg, setSlideImg] = useState(false);
    const copyClipboard = () => {
        CopyClipboard();
        setSlideImg(true);
        setTimeout(fadeOutSlideImg, 1000);
    };
    const fadeOutSlideImg = () => {
        setSlideImg(false);
    };

    return (
        <li css={wrapperStyle(theme)}>
            <article>
                <section css={headerStyle(theme)} onClick={copyClipboard}>
                    <h1>{post.userName}</h1>
                    <span css={copiedClipboard(theme, slideImg)}>copied 😊</span>
                </section>
                <section css={dateStyle}>{post.date}</section>
                <section css={contentStyle}>
                    <main id="main-message">
                        <AwesomeRenderer guest>{post.body}</AwesomeRenderer>
                    </main>
                </section>
            </article>
        </li>
    );
}

export default MessageCard;

const wrapperStyle = (theme: ITheme) => css`
    max-width: 100%;
    align-items: center;
    line-height: 1.625;
    word-break: break-all;
    border: 1px solid #eee;
    border-radius: 25px;
    padding: 1.5em;
    padding-bottom: 0.3rem;
    margin-bottom: 1.5em;
`;

const headerStyle = (theme: ITheme) => css`
    display: flex;
    align-items: center;
    cursor: pointer;
    max-height: 22px;

    & > h1 {
        font-size: 1rem;
        font-weight: 500;
        line-height: 2rem;
    }

    & > h1:hover {
        color: ${theme.primaryColor};
        transition: 0.5s;
        transition-property: color;
    }
`;

const copiedClipboard = (theme: ITheme, slideImg: boolean) => css`
    width: 78px;
    padding: 1px 6px;
    margin-left: 0.5rem;
    margin-bottom: 0.25rem;
    line-height: 2rem;
    color: ${theme.buttonText};
    background: ${theme.primaryColor};
    opacity: ${slideImg ? 1 : 0};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    transition: 0.35s;
    transition-property: opacity;
`;

const dateStyle = (theme: ITheme) => css`
    margin-top: 0.24rem;
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: ${theme.textGray};
`;

const contentStyle = (theme: ITheme) => css`
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;

    & > button {
        width: 3rem;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
    }

    & > main {
        color: ${theme.textGray};

        & > p {
            line-height: 1.625;
            margin: 0;
            margin-bottom: 2rem;
        }
    }
`;
