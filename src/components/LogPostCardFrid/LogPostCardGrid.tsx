/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useState } from 'react';
import CopyClipboard from '../../hooks/copyClipboard';
import { font } from '../../lib/styles/font';
import media from '../../lib/styles/media';
import { ITheme } from '../../lib/styles/Theme';
import AwesomeRenderer from '../AwesomeRenderer';

export type LogPostCardGridProps = {
    post: {
        title: string;
        date: string;
        body: any;
        starCount: number;
        id: number;
    };
};

function LogPostCardGrid({ post }: LogPostCardGridProps) {
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
                    <h1>{post.title}</h1>
                    {slideImg && <span css={copiedClipboard(theme, slideImg)}>copied 😊</span>}
                </section>
                <section css={dateStyle}>{post.date}</section>
                <section css={contentStyle}>
                    <main>
                        <AwesomeRenderer>{post.body}</AwesomeRenderer>
                    </main>
                </section>
            </article>
        </li>
    );
}

export default LogPostCardGrid;

const wrapperStyle = (theme: ITheme) => css`
    ${media.small} {
        margin-right: 0;
        margin-left: 0.125rem;
    }

    align-items: center;
    line-height: 1.625;
    word-break: break-all;
    border-bottom: 0.2px solid ${theme.grayBorder};

    & > article {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
`;

const headerStyle = (theme: ITheme) => css`
    ${media.small} {
        & > h1 {
            font-size: 1.275rem !important;
        }
    }
    display: flex;
    align-items: center;
    cursor: pointer;

    & > h1 {
        font-size: 1.5rem;
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
    width: 90px;
    max-height: 45px;
    padding: 1px 6px;
    margin-bottom: 0.25rem;
    margin-left: 1rem;
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
    ${media.small} {
        font-size: ${font.mobileSmall} !important;
    }
    margin-top: 0.24rem;
    font-size: ${font.Small}
    line-height: 1.25rem;
    color: ${theme.textGray};

}
`;

const contentStyle = (theme: ITheme) => css`
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;

    & > main {
        color: rgba(75, 85, 99, 0.97);

        & > p {
            line-height: 1.625;
            margin: 0;
            margin-bottom: 2rem;
        }
    }
`;
