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
import AwesomeLoader from '../../components/AwesomeLoader/AwesomeLoader';
import media from '../../lib/styles/media';
import { font } from '../../lib/styles/font';

function Log() {
    const theme = useTheme();

    // redux-thunk
    const getLog = (state: RootReducerType) => state.FetchLogReducer.posts;
    const getLogs = createSelector(getLog, post => {
        return post;
    });

    const posts = [];
    const { data, loading } = useSelector(getLogs);
    const dispatch = useDispatch();
    for (let key in data) {
        posts.push(data[key]);
    }

    useEffect(() => {
        if (data) return;
        dispatch(getLogsAction());
    }, [data, dispatch]);

    if (loading && !data) return <AwesomeLoader />;
    if (!data) return null;

    // firebase sdk
    /*
    const [posts, setPosts] = useState([]);
    const db = getDatabase(firebaseApp);
    const logRef = ref(db, 'log');

    useEffect(() => {
        onValue(logRef, snapshot => {
            const data = snapshot.val();
            setPosts(data.posts);
        });
    }, [logRef]);
    */

    return (
        <>
            <Helmet>
                <title>awesome import • log</title>
            </Helmet>
            <div css={wrapperStyle(theme)}>
                <header>
                    <h1>Log</h1>
                    <p>Createhb21 👨‍💻, 제 일상을 기록하는 공간입니다 :D </p>
                </header>
                <div css={writeLogStyle(theme)}>
                    <ul css={postListStyle(theme)}>
                        {posts &&
                            posts.reverse().map((item: any, index: number) => {
                                return <LogPostCardGrid key={index} post={item} />;
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
    ${media.small} {
        padding-left: 1rem;
        padding-right: 1rem;

        & > header {
            & > h1 {
                font-size: ${font.mobileXXLarge} !important;
            }

            & > p {
                font-size: ${font.mobileMedium} !important;
            }
        }
    }

    width: 100%;
    margin-top: 1.525rem;
    display: block;

    & > img {
        width: 30%;
    }

    & > header {
        padding-top: 3.5rem;

        & > h1 {
            font-weight: 700;
            font-size: ${font.xxLarge};
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
            font-size: ${font.Medium};
            line-height: 1.5rem;
        }
    }
`;
