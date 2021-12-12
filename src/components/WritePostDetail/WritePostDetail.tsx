/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { ITheme } from '../../lib/styles/Theme';
import { useLocation, useParams } from 'react-router-dom';
import { IWriteData } from '../../hooks/useWriteTextData';
import { data } from '../../hooks/useWriteTextData';
import PostRoofBtn from '../PostRoofBtn';
import media from '../../lib/styles/media';

function WritePostDetail() {
    const { posts } = data;
    const theme = useTheme();
    const { id } = useParams()! as { id: string };
    const { category, title, date, content } = posts[+id - 1];

    return (
        <>
            <div css={wrapperStyle(theme)}>
                <header css={headerStyle(theme)}>
                    <div>
                        <span>{category}</span>
                    </div>
                    <h1>{title}</h1>
                    <div css={infoStyle(theme)}>
                        Createhb21
                        <span>·</span>
                        {date}
                    </div>
                </header>
                <div>
                    <main css={contentStyle(theme)}>{content}</main>
                </div>
                <PostRoofBtn currentId={+id} />
            </div>
        </>
    );
}

export default WritePostDetail;

const wrapperStyle = (theme: ITheme) => css`
    ${media.small} {
        padding: 1.125rem;
    }
`;

const headerStyle = (theme: ITheme) => css`
    padding-top: 4rem;
    padding-bottom: 3rem;

    & > div:first-child {
    margin-bottom: .5rem;
        & > span {
            font-size: 1rem;
            line-height: 1.5rem;
            background-color: ${theme.primaryColor};
        }
    }
}
`;

const infoStyle = (theme: ITheme) => css`
    color: ${theme.textGray};
    font-size: 0.875rem;
    line-height: 1.25rem;
    align-items: center;
    display: flex;

    & > span {
        margin-left: 0.375rem;
        margin-right: 0.375rem;
    }
`;

const contentStyle = (theme: ITheme) => css`
    color: ${theme.text};

    & > p {
        margin-bottom: 2rem;
        line-height: 1.625;
    }

    & > h2 {
        font-size: 1.875rem;
        line-height: 2.25rem;
        margin-top: 8rem;
    }
`;
