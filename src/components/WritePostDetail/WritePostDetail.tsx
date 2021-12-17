/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { ITheme } from '../../lib/styles/Theme';
import { useParams } from 'react-router-dom';
import { data } from '../../hooks/useWriteTextData';
import media from '../../lib/styles/media';
import PostLoopBtn from '../PostLoopBtn';
import { fetchPostData } from '../../modules/FetchPostData';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerType } from '../..';
import AwesomeRenderer from '../AwesomeRenderer';

function WritePostDetail() {
    const theme = useTheme();
    const { id } = useParams()! as { id: string };
    const postReducer = useSelector((state: RootReducerType) => state.FetchPostReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPostData('write', parseInt(id)));
    }, []);

    return (
        <>
            {postReducer.posts && (
                <div css={wrapperStyle(theme)}>
                    <header css={headerStyle(theme)}>
                        <div>
                            <span>{postReducer.posts.category}</span>
                        </div>
                        <h1>{postReducer.posts.title}</h1>
                        <span css={infoStyle(theme)}>
                            Createhb21
                            <span>·</span>
                            {postReducer.posts.date}
                        </span>
                    </header>
                    <div>
                        <main css={contentStyle(theme)}>
                            <AwesomeRenderer>{postReducer.posts.body}</AwesomeRenderer>
                        </main>
                    </div>
                    <PostLoopBtn currentId={+id} data={data} />
                </div>
            )}
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

    & > div {
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
    display: inline-flex;
    align-items: center;

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
