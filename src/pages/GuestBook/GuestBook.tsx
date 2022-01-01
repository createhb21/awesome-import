/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AwesomeEditor from '../../components/AwesomeEditor/AwesomeEditor';
import { ITheme } from '../../lib/styles/Theme';
import MessageCard from '../../components/GuestBookGrid';
import { getDatabase, onValue, ref } from 'firebase/database';
import firebaseApp from '../../lib/storage/firebase';
import AwesomeLoader from '../../components/AwesomeLoader/AwesomeLoader';
import { font } from '../../lib/styles/font';
import media from '../../lib/styles/media';

interface GuestBookTypes {
    userName: string;
    password: number;
    body: string;
    date: string;
    starCount: number;
    id: any;
}

function GuestBook() {
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

    if (loading) return <AwesomeLoader />;

    return (
        <>
            <Helmet>
                <title>awesome import • guestbook</title>
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

    ${media.small} {
        & > header {
            & > h1 {
                font-size: ${font.mobileXXLarge} !important;
            }

            & > p {
                font-size: ${font.mobileMedium} !important;
            }
        }
    }
`;
