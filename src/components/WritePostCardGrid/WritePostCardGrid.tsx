/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { ITheme } from '../../lib/styles/Theme';
import { PostType } from '../../modules/FetchPostData';

export type WritePostCardGridProps = {
    post: PostType;
};

function TechPostCardGrid({ post }: WritePostCardGridProps) {
    const theme = useTheme();
    const { id, category, title, body, date, img } = post;
    const { blocks } = body! as any;

    return (
        <li css={wrapperStyle(theme)}>
            <Link
                to={{
                    pathname: `/write/${id}`,
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
                                {blocks.slice(0, 2).map((item: any, index: number) => {
                                    return <span key={index}>{item.text}</span>;
                                })}
                            </p>
                            <span>{date}</span>
                        </div>
                        <div css={imageStyle(theme)}>
                            <span>
                                <img src={img} alt="img" />
                            </span>
                        </div>
                    </section>
                </article>
            </Link>
        </li>
    );
}

export default TechPostCardGrid;

const wrapperStyle = (theme: ITheme) => css`
    align-items: center;
    line-height: 1.625;
    word-break: break-all;

    & > article {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
`;

const containerStyle = (theme: ITheme) => css`
    padding: 0;
    padding-top: 2rem;
    padding-bottom: 2rem;
`;

const categoryStyle = (theme: ITheme) => css`
    margin-bottom: 0.5rem;

    & > span {
        display: inline-block;
        opacity: 0.7;
        font-size: 1rem;
        line-height: 1.5rem;
        padding-left: 0.375rem;
        padding-right: 0.375rem;
        background-color: ${theme.primaryColor};
    }
`;

const contentWrapperStyle = (theme: ITheme) => css`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
`;

const titleStyle = (theme: ITheme) => css`
    margin: 0;
    grid-column: 1/10;
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 0.5rem;
`;

const summaryStyle = (theme: ITheme) => css`
    grid-row-start: 2;
    grid-column: 1/10;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 1rem;
    line-height: 1.5rem
    display: flex;
    justify-content: center;
    align-items: center;
    
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
        }
    }
`;
