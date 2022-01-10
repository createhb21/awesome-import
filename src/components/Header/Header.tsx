/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';

function Header() {
    const { scrollY } = useScroll();
    const navRef = useRef<HTMLImageElement>(null);
    const [navBarHeight, setNavBarHeight] = useState(0);

    const navigate = useNavigate();
    const routingCategory = () => {
        navigate('/categories');
    };

    useEffect(() => {
        if (!navRef.current) return;
        setNavBarHeight(navRef.current?.getBoundingClientRect().height);
    }, []);

    return (
        <div ref={navRef} css={wrapperStyle(scrollY, navBarHeight)}>
            <span onClick={routingCategory}>Category</span>
        </div>
    );
}

export default Header;

const wrapperStyle = (scrollY: number, navBarHeight: number) => css`
    width: 100%;
    span {
        padding-top: 2rem;
        padding-left: 4.5rem;
        position: absolute;
        cursor: pointer;
        font-size: 1.3rem;
        transform: ${scrollY > navBarHeight ? 'translateY(-500px)' : ''};
        transition: 0.25s ease-in-out;
        transition-property: transform;
    }
`;
