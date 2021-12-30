/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { ITheme } from '../../lib/styles/Theme';
import { useParams } from 'react-router-dom';
import media from '../../lib/styles/media';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerType } from '../..';
import AwesomeRenderer from '../AwesomeRenderer';
import { clearPost, getPostAction } from '../../modules/Fetch/FetchPostData';
import { createSelector } from '@reduxjs/toolkit';
import CopyClipboard from '../../hooks/copyClipboard';
import { font } from '../../lib/styles/font';

function WritePostDetail() {
    const theme = useTheme();

    const [slideImg, setSlideImg] = useState(false);
    const copyClipboard = () => {
        CopyClipboard();
        setSlideImg(true);
        setTimeout(fadeOutSlideImg, 1000);
    };
    const fadeOutSlideImg = () => {
        setSlideImg(false);
    };

    const { id } = useParams()! as { id: string };
    const getPost = (state: RootReducerType) => state.FetchPostReducer.post;
    const getPostCreateSelector = createSelector(getPost, post => {
        return post;
    });

    const { data } = useSelector(getPostCreateSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostAction(id));
        return () => {
            dispatch(clearPost());
        };
    }, [dispatch, id]);

    if (!data) return null;

    return (
        <>
            {data && (
                <div css={wrapperStyle(theme)}>
                    <header css={headerStyle(theme)}>
                        <div>
                            <span>{data?.category}</span>
                        </div>
                        <span>
                            <h1 onClick={copyClipboard}>{data?.title}</h1>
                            {slideImg && <span css={copiedClipboard(theme, slideImg)}>copied 😊</span>}
                        </span>
                        <span css={infoStyle(theme)}>
                            Createhb21
                            <span>·</span>
                            {data?.date}
                        </span>
                    </header>
                    <div>
                        <main css={contentStyle(theme)}>
                            <AwesomeRenderer>{data?.body}</AwesomeRenderer>
                        </main>
                    </div>
                    {/* <PostLoopBtn currentId={+id} data={data} /> */}
                </div>
            )}
        </>
    );
}

export default WritePostDetail;

const wrapperStyle = (theme: ITheme) => css`
    ${media.small} {
        margin-right: 0;
        margin-left: 0.125rem;
    }

    align-items: center;
    line-height: 1.625;
    word-break: break-all;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const headerStyle = (theme: ITheme) => css`
    ${media.small} {
        padding-top: 1.5rem;

        & > div {
            & > span {
                font-size: ${font.mobileMedium} !important;
            }
        }
    }
    padding-top: 4rem;
    padding-bottom: 3rem;

    & > div {
        margin-bottom: 0.5rem;
        & > span {
            font-size: ${font.Medium};
            line-height: 1.5rem;
            background-color: ${theme.primaryColor};
        }
    }

    & > span {
        display: flex;

        & > h1 {
            cursor: pointer;
        }

        & > h1:hover {
            color: ${theme.primaryColor};
            transition: 0.5s;
            transition-property: color;
        }
    }
`;

const copiedClipboard = (theme: ITheme, slideImg: boolean) => css`
    width: 90px;
    max-height: 40px;
    padding: 1px 6px;
    margin-top: 0.25rem;
    margin-left: 1rem;
    line-height: 2rem;
    color: ${theme.buttonText};
    background: ${theme.primaryColor};
    opacity: ${slideImg ? 1 : 0};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    transition: 0.35s;
    transition-property: opacity;
`;

const infoStyle = (theme: ITheme) => css`
    color: ${theme.textGray};
    font-size: ${font.Small};
    line-height: 1.25rem;
    display: inline-flex;
    align-items: center;

    & > span {
        margin-left: 0.375rem;
        margin-right: 0.375rem;
    }

    &{media.small} {
        font-size: ${font.mobileSmall} !important;
    }
`;

const contentStyle = (theme: ITheme) => css`
    color: ${theme.textGray};

    & > p {
        margin-bottom: 2rem;
        line-height: 1.625;
    }
`;
