/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { createSelector } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../..';
import AwesomeEditor from '../../components/AwesomeEditor/AwesomeEditor';
import { getMsgAction } from '../../modules/Fetch/FetchGuestBook';
import { ITheme } from '../../lib/styles/Theme';
import MessageCard from '../../components/GuestBookGrid';

export type GuestBookProps = {};

function GuestBook({}: GuestBookProps) {
    const theme = useTheme();
    const getMessage = (state: RootReducerType) => state.FetchGuestBookReducer.posts;
    const getMessages = createSelector(getMessage, message => {
        return message;
    });
    const { data, loading, error } = useSelector(getMessages);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) return;
        dispatch(getMsgAction());
    }, [data, dispatch]);

    if (loading && !data) return <div>loading...</div>;

    return (
        <>
            <Helmet>
                <title>@_Import/guestbook</title>
            </Helmet>
            <div css={wrapperStyle(theme)}>
                <header>
                    <h1>GuestBook</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat consequatur tempore culpa, consectetur dolores nam praesentium veritatis in quam nesciunt! Reiciendis </p>
                </header>
                <div>
                    <AwesomeEditor guest />
                </div>
                <div css={writeLogStyle(theme)}>
                    <ul css={postListStyle(theme)}>
                        {data &&
                            data.map((msgBox: any) => {
                                return <MessageCard post={msgBox} />;
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
