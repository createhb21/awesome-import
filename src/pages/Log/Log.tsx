/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import LogPostCardGrid from '../../components/LogPostCardFrid';
import { ITheme } from '../../lib/styles/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../..';
import { useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { getLogsAction } from '../../modules/Fetch/FetchLogData';

function Log() {
    const theme = useTheme();
    const getLog = (state: RootReducerType) => state.FetchLogReducer.posts;
    const getLogs = createSelector(getLog, post => {
        return post;
    });
    const { data, loading, error } = useSelector(getLogs);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) return;
        dispatch(getLogsAction());
    }, [data, dispatch]);

    if (loading && !data) return <div>loading...</div>;
    if (!data) return null;

    return (
        <>
            <Helmet>
                <title>@_Import/log</title>
            </Helmet>
            <div css={wrapperStyle(theme)}>
                <header>
                    <h1>Log</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat consequatur tempore culpa, consectetur dolores nam praesentium veritatis in quam nesciunt! Reiciendis </p>
                </header>
                <div css={writeLogStyle(theme)}>
                    <ul css={postListStyle(theme)}>
                        {data &&
                            data.map((item: any) => {
                                return <LogPostCardGrid key={item.id} post={item} />;
                            })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Log;

const postListStyle = (theme: ITheme) => css`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const writeLogStyle = (theme: ITheme) => css`
    padding-top: 1rem;
    padding-bottom: 1rem;
`;

const wrapperStyle = (theme: ITheme) => css`
    width: 100%;
    margin-top: 1.525rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: block;

    & > img {
        width: 30%;
    }

    & > header {
        padding-top: 3.5rem;
        padding-bottom: 3.5rem;

        & > h1 {
            font-weight: 700;
            font-size: 2.25rem;
            line-height: 2.5rem;
            margin-bottom: 1rem;
        }

        & > p {
            display: block;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            color: ${theme.textGray};
            font-size: 1rem;
            line-height: 1.5rem;
        }
    }
`;
