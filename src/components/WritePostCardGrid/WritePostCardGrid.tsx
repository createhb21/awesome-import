/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { font } from '../../lib/styles/font';
import media from '../../lib/styles/media';
import { ITheme } from '../../lib/styles/Theme';
import { WritePostType } from '../../modules/Fetch/FetchPostData';

export type WritePostCardGridProps = {
    post: WritePostType;
    postId: string;
};

function TechPostCardGrid({ post, postId }: WritePostCardGridProps) {
    const theme = useTheme();
    const { category, title, body, date, img } = post;
    const formatText = JSON.parse(body).blocks;

    return (
        <li css={wrapperStyle(theme)}>
            <Link
                to={{
                    pathname: `/dev/${postId}`,
                }}
            >
                <article css={containerStyle(theme)}>
                    <section css={categoryStyle(theme)}>
                        <span>{category}</span>
                    </section>
                    <section css={contentWrapperStyle(theme)}>
                        <h1 css={titleStyle(theme)}>{title}</h1>
                        <div css={summaryStyle(theme)}>
                            <p>
                                {formatText &&
                                    formatText.map((item: any, index: number) => {
                                        return <span key={index}>{item.text}</span>;
                                    })}
                            </p>
                            <span>{date}</span>
                        </div>
                        {img && (
                            <div css={imageStyle(theme)}>
                                <span>
                                    <img src={img} alt="img" />
                                </span>
                            </div>
                        )}
                    </section>
                </article>
            </Link>
        </li>
    );
}

export default TechPostCardGrid;

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

const containerStyle = (theme: ITheme) => css`
    ${media.small} {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    padding: 0;
    padding-top: 2rem;
    padding-bottom: 2rem;
`;

const categoryStyle = (theme: ITheme) => css`
    ${media.small} {
        & > span {
            line-height: 1rem;
        }
    }

    margin-bottom: 0.5rem;

    & > span {
        display: inline-block;
        opacity: 0.7;
        font-size: ${font.Medium};
        line-height: 1.5rem;
        padding-left: 0.375rem;
        padding-right: 0.375rem;
        background-color: ${theme.primaryColor};
    }
`;

const contentWrapperStyle = (theme: ITheme) => css`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));

    &:hover {
        & > h1 {
            color: ${theme.primaryColor};
            transition: 0.2s;
            transition-property: color;
        }
    }
`;

const titleStyle = (theme: ITheme) => css`
    ${media.small} {
        font-size: ${font.Large};
        grid-column: 1/8;
    }

    margin: 0;
    grid-column: 1/10;
    font-size: ${font.xLarge};
    line-height: 2rem;
    margin-bottom: 0.5rem;
`;

const summaryStyle = (theme: ITheme) => css`
    ${media.small} {
        grid-row-start: 2;
        grid-column: 1/8;
        font-size: ${font.mobileMedium};
    }

    grid-row-start: 2;
    grid-column: 1/10;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: ${font.Medium};
    line-height: 1.5rem;

    & > p {
        height: 3rem;
        color: ${theme.mainContentText};
        overflow-wrap: break-word;
        overflow: hidden;
        margin: 0;
    }

    & > span {
        margin-top: 1rem;
        color: ${theme.mainContentText};
        display: inline-flex;
    }
`;

const imageStyle = (theme: ITheme) => css`
    ${media.small} {
        grid-row: 1/3;
        grid-column: 8/13;
    }

    grid-row: 1/3;
    grid-column: 10/13;
    margin-left: 1.5rem;
    justify-self: stretch;
    align-self: stretch;
    & > span {
        display: inline-block;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        & > img {
            position: absolute;
            top: 0px;
            left: 0px;
            max-width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            transition-delay: 500ms;
            border-radius: 5px;
        }
    }
`;
