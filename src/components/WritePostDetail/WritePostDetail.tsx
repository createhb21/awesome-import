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
import Meta from '../Meta/Meta';

function WritePostDetail() {
    const theme = useTheme();
    const screenX = window.screen.width;
    const mediaMedium = 768;
    const [slideImg, setSlideImg] = useState(false);
    const [mobileSlideImg, mobileSetSlideImg] = useState(false);
    const copyClipboard = () => {
        CopyClipboard();
        screenX >= mediaMedium ? setSlideImg(true) : mobileSetSlideImg(true);
        setTimeout(fadeOutSlideImg, 1000);
    };
    const fadeOutSlideImg = () => {
        screenX >= mediaMedium ? setSlideImg(false) : mobileSetSlideImg(false);
    };

    const { id } = useParams()! as { id: string };
    const getPost = (state: RootReducerType) => state.FetchPostReducer.post;
    const getPostCreateSelector = createSelector(getPost, post => {
        return post;
    });

    const { data } = useSelector(getPostCreateSelector);
    const dispatch = useDispatch();

    let tags = [];
    for (let key in data?.tags) {
        tags.push(key);
    }

    useEffect(() => {
        dispatch(getPostAction(id));
        return () => {
            dispatch(clearPost());
        };
    }, [dispatch, id]);

    const currentUrl = window.location.href;
    const metaData = {
        title: data?.title,
        description: 'Createhb21 • awesome import • write',
        url: currentUrl,
        image: data?.img,
    };

    if (!data) return null;

    return (
        <>
            <Meta metaData={metaData} />
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
                        <div css={tagsWrapperStyle}>
                            {tags.map(tag => {
                                return <span># {tag}</span>;
                            })}
                        </div>
                    </div>
                    {mobileSlideImg && (
                        <span css={mobileCopiedClipboard(theme, mobileSlideImg)}>
                            <div css={backGroundStyle}>
                                <div css={copyStyle(theme, mobileSlideImg)}>copied 😊</div>
                            </div>
                        </span>
                    )}
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
    max-height: 32px;
    padding: 1px 6px;
    margin-top: 0.53rem;
    margin-left: 1rem;
    border-radius: 15px;
    color: ${theme.buttonText};
    background: ${theme.primaryColor};
    opacity: ${slideImg ? 1 : 0};
    display: flex;
    justify-content: center;
    align-items: center;
`;
const mobileCopiedClipboard = (theme: ITheme, mobileSlideImg: boolean) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
`;

const backGroundStyle = css`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const copyStyle = (theme: ITheme, mobileSlideImg: boolean) => css`
    position: relative;
    top: 0px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    text-align: center;
    z-index: 10;
    width: 5.5em;
    color: ${theme.buttonText};
    background: ${theme.primaryColor};
    opacity: ${mobileSlideImg ? 1 : 0};
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
    margin-bottom: 1.5rem;
    & > p {
        margin-bottom: 2rem;
        line-height: 1.625;
    }
`;

const tagsWrapperStyle = (theme: ITheme) => css`
    ${media.small} {
        & > span {
            font-size: ${font.mobileSmall} !important;
        }
    }

    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    border-top: 0.5px solid ${theme.grayBorder};

    & > span {
        color: ${theme.textGray};
        padding: 0.3rem 3px;
        padding-top: 1.2rem;
        font-size: ${font.Small};
        font-weight: 700;

        &:hover {
            color: ${theme.primaryColor};
            transform: translateY(-15%);
            transition: ease-in-out 0.25s;
            transition-property: color, transform;
        }

        &:last-of-type {
            margin-right: 5px;
        }
    }
`;
