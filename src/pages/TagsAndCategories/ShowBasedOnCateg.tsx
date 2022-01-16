/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import AwesomeLoader from '../../components/AwesomeLoader/AwesomeLoader';
import CategoryGridCard from '../../components/CategoryGrid/CategoryGridCard';
import media from '../../lib/styles/media';
import { RootReducerType } from '../..';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from '../../modules/Fetch/FetchPostData';

function ShowBasedOnCateg() {
    const [posts, setPosts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const { data, loading } = useSelector((state: RootReducerType) => state.FetchPostReducer.posts);

    const dispatch = useDispatch();
    useEffect(() => {
        if (data) return;
        dispatch(getPostsAction());
    }, [data, dispatch]);

    useEffect(() => {
        const postData: any = [];
        const objdata = data;
        for (let key in objdata) {
            postData.push(objdata[key]);
        }
        setPosts(postData);
        const newCategories = [...new Set(postData.map((cate: any) => cate.category))];
        setCategories(newCategories);
    }, [data]);

    if (loading && !data) return <AwesomeLoader />;

    return (
        <div css={wrapperStyle}>
            <h1>All Categories</h1>
            <ul css={postListStyle}>
                {categories &&
                    categories.map((item: any, index: number) => {
                        return <CategoryGridCard key={index} posts={posts} item={item} />;
                    })}
            </ul>
        </div>
    );
}

export default ShowBasedOnCateg;

const wrapperStyle = css`
    ${media.small} {
        padding-left: 1rem;
    }
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
