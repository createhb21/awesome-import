/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { ITheme } from '../../lib/styles/Theme';
import AwesomeRenderer from '../AwesomeRenderer';

export type MessageCardProps = {
    post: any;
};

function MessageCard({ post }: MessageCardProps) {
    const theme = useTheme();

    return (
        <li css={wrapperStyle(theme)}>
            <article>
                <section css={headerStyle(theme)}>
                    <h1>{post.userName}</h1>
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
    align-items: center;
    line-height: 1.625;
    word-break: break-all;
    border: 1px solid #eee;
    border-radius: 25px;
    width: 40rem;
    padding: 1.5em;
    margin-bottom: 1.5em;
`;

const headerStyle = (theme: ITheme) => css`
    display: flex;
    align-items: center;
    cursor: pointer;

    & > h1 {
        font-size: 1rem;
        font-weight: 500;
        line-height: 2rem;
    }
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
        color: rgba(75, 85, 99, 0.97);

        & > p {
            line-height: 1.625;
            margin: 0;
            margin-bottom: 2rem;
        }
    }
`;
