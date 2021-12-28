/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { createSelector } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../..';
import AwesomeEditor from '../../components/AwesomeEditor/AwesomeEditor';
import { getMsgAction } from '../../modules/Fetch/FetchGuestBook';
import { ITheme } from '../../lib/styles/Theme';
import MessageCard from '../../components/GuestBookGrid';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import firebaseApp from '../../lib/storage/firebase';
import AwesomeLoader from '../../components/AwesomeLoader/AwesomeLoader';

export type GuestBookProps = {};

interface GuestBookTypes {
    userName: string;
    password: number;
    body: string;
    date: string;
    starCount: number;
    id: any;
}

function GuestBook({}: GuestBookProps) {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    // firebase
    const db = getDatabase(firebaseApp);
    const guestbookRef = ref(db, 'guestbook');
    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        onValue(guestbookRef, snapshot => {
            const commentData: Array<GuestBookTypes> = [];
            const objdata = snapshot.val();
            for (let key in objdata) {
                commentData.push(objdata[key]);
            }
            setComments(commentData.reverse());
            setLoading(false);
        });
    }, []);

    // redux-thunk
    /*
    const getMessage = (state: RootReducerType) => state.FetchGuestBookReducer.posts;
    const getMessages = createSelector(getMessage, message => {
        return message;
    });
    const { data, loading, error } = useSelector(getMessages);
    const comments = [];
    for (let key in data) {
        comments.push(data[key]);
    }
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) return;
        dispatch(getMsgAction());
    }, [data, dispatch]);

    if (loading && !data) return <div>loading...</div>;
    if (!data) return null;
    */

    if (loading) return <AwesomeLoader />;

    return (
        <>
            <Helmet>
                <title>@_Import | guestbook</title>
            </Helmet>
            <div css={wrapperStyle(theme)}>
                <header>
                    <h1>GuestBook</h1>
                    <p>
                        Praise makes even whales dance 🐳
                        <br />
                        응원의 한마디! Createhb21님에게 보내보세요 :D
                    </p>
                </header>
                <div>
                    <AwesomeEditor guest />
                </div>
                <div css={writeLogStyle(theme)}>
                    <ul css={postListStyle(theme)}>
                        {comments &&
                            comments.map((msgBox: any, index: number) => {
                                return <MessageCard key={index} post={msgBox} />;
                            })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default GuestBook;

const postListStyle = (theme: ITheme) => css`
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 1.5rem;
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
