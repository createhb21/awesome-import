/** @jsxImportSource @emotion/react */
import { Helmet } from 'react-helmet-async';
import { css, keyframes, useTheme } from '@emotion/react';
import { ITheme } from '../../lib/styles/Theme';
import WritePostCardGrid from '../../components/WritePostCardGrid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../..';
import { getPostsAction, WritePostType } from '../../modules/Fetch/FetchPostData';
import { createSelector } from '@reduxjs/toolkit';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import firebaseApp from '../../lib/storage/firebase';
import palette from '../../lib/palette';
import AwesomeLoader from '../../components/AwesomeLoader/AwesomeLoader';

function Write() {
    const theme = useTheme();
    const getPost = (state: RootReducerType) => state.FetchPostReducer.posts;
    const getPosts = createSelector(getPost, post => {
        return post;
    });

    const posts: any = [];
    const postId: any = [];
    const { data, loading, error } = useSelector(getPosts);
    const dispatch = useDispatch();
    for (let key in data) {
        postId.push(key);
        posts.push(data[key]);
    }

    useEffect(() => {
        if (data) return;
        dispatch(getPostsAction());
    }, [data, dispatch]);

    if (loading && !data) return <AwesomeLoader />;
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
                    <p>Createhb21 👨‍💻, 개발 관련 글을 기록하는 공간입니다 :D</p>
                </header>
                <ul css={postListStyle(theme)}>
                    {posts &&
                        posts.reverse().map((item: WritePostType, index: number) => {
                            return <WritePostCardGrid key={item.id} post={item} postId={postId[posts.length - (index + 1)]} />;
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
