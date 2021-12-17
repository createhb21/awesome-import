import Axios from 'axios';
import React, { useEffect } from 'react';
import { IPost } from '../modules/FetchPostData';

type Cancel = () => void;

const UseAxiHook = (category: string) => {
    const [posts, setPosts] = React.useState<IPost[]>([]);
    const [error, setError] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        setPosts([]);
    }, [category]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel: Cancel;
        Axios.get(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEVELOP_API_URL : process.env.REACT_APP_RELEASE_API_URL}/${category}.json`, {
            cancelToken: new Axios.CancelToken(c => (cancel = c)),
        })
            .then(res => {
                const posts = res.data.posts;
                setPosts(prevPosts => {
                    return [...new Set([...prevPosts, ...posts])];
                });
                setLoading(false);
            })
            .catch(err => {
                if (Axios.isCancel(err)) return;
                setError(true);
            });
        return () => cancel();
    }, [category]);

    return {
        posts,
        error,
        loading,
    };
};
export default UseAxiHook;
