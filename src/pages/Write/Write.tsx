/** @jsxImportSource @emotion/react */
import { Helmet } from 'react-helmet-async';
import { css, useTheme } from '@emotion/react';
import { ITheme } from '../../lib/styles/Theme';
import WritePostCardGrid from '../../components/WritePostCardGrid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../..';
import { getPostsAction, PostType } from '../../modules/Fetch/FetchPostData';
import { createSelector } from '@reduxjs/toolkit';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import firebaseApp from '../../lib/storage/firebase';

function Write() {
    const theme = useTheme();
    const getPost = (state: RootReducerType) => state.FetchPostReducer.posts;
    const getPosts = createSelector(getPost, post => {
        return post;
    });
    const { data, loading, error } = useSelector(getPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) return;
        dispatch(getPostsAction());
    }, [data, dispatch]);

    if (loading && !data) return <div>loading...</div>;
    if (!data) return null;

    // firebase sdk
    /*
    const [posts, setPosts] = useState([]);
    const db = getDatabase(firebaseApp);
    const writeRef = ref(db, 'write');

    useEffect(() => {
        onValue(writeRef, snapshot => {
            const data = snapshot.val();
            setPosts(data.posts);
        });
    }, [writeRef]);
    */

    return (
        <>
            <Helmet>
                <title>@_Import/write</title>
            </Helmet>
            <div css={wrapperStyle(theme)}>
                <header>
                    <h1>Write</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat consequatur tempore culpa, consectetur dolores nam praesentium veritatis in quam nesciunt! Reiciendis </p>
                </header>
                <ul css={postListStyle(theme)}>
                    {data &&
                        data.map((item: PostType) => {
                            return <WritePostCardGrid key={item.id} post={item} />;
                        })}
                </ul>
            </div>
        </>
    );
}

export default Write;

const postListStyle = (theme: ITheme) => css`
    list-style: none;
    margin: 0;
    padding: 0;
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
