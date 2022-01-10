/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import AwesomeLoader from '../../components/AwesomeLoader/AwesomeLoader';
import firebaseApp from '../../lib/storage/firebase';
import CategoryGridCard from '../../components/CategoryGrid/CategoryGridCard';

function ShowBasedOnTags() {
    const [loading, setLoading] = useState(false);
    const db = getDatabase(firebaseApp);
    const postRef = ref(db, 'write');
    const [posts, setPosts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        onValue(postRef, snapshot => {
            const postData: any = [];
            const objdata = snapshot.val().posts;
            for (let key in objdata) {
                postData.push(objdata[key]);
            }
            setPosts(postData);
            const newCategories = [...new Set(postData.map((cate: any) => cate.category))];
            setCategories(newCategories);
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <AwesomeLoader />;

    return (
        <div css={wrapperStyle}>
            <h1>Category</h1>
            <ul css={postListStyle}>
                {categories &&
                    categories.map((item: any, index: number) => {
                        return <CategoryGridCard key={index} posts={posts} item={item} />;
                    })}
            </ul>
        </div>
    );
}

export default ShowBasedOnTags;

const wrapperStyle = css`
    margin-top: 5rem;
`;

const postListStyle = css`
    list-style: none;
    margin: 0;
    padding: 1rem 0 0 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto-fill, minmax(70px, auto));
    row-gap: 40px;
    column-gap: 20px;
`;
