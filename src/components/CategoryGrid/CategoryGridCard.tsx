/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Awesomecon from '../Awesomecon';
import palette from '../../lib/palette';
import { ITheme } from '../../lib/styles/Theme';
import media from '../../lib/styles/media';

export type CategoryGridCardProps = {
    posts: any;
    item: any;
};

function CategoryGridCard({ posts, item }: CategoryGridCardProps) {
    const theme = useTheme();
    const [eachCateg, SetEachCateg] = useState<any[]>([]);

    useEffect(() => {
        const filter = posts.filter((post: any) => post.category === item);
        SetEachCateg(filter);
    }, [item, posts]);

    return (
        <div css={gridStyle(theme)}>
            <span>
                <Awesomecon name="folder" />
                <h3>{item}</h3>
            </span>
            <ul>
                {eachCateg &&
                    eachCateg.map((item: any, index: number) => {
                        return (
                            <li key={index}>
                                <Link to={`/dev/${item.id}`}>{item.title}</Link>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default CategoryGridCard;

const gridStyle = (theme: ITheme) => css`
    ${media.small} {
        padidng: 0 1rem;

        span {
            h3 {
                font-size: 1rem;
            }
        }
    }
    width: 100%;

    span {
        display: inline-flex;
        justify-content: center;
        align-items: center;

        svg {
            color: ${palette.blueGrey[400]};
        }

        h3 {
            cursor: pointer;
            padding-top: 0.45rem;
            padding-left: 0.4rem;

            &:hover {
                transform: scale(1.005, 1.1);
                transition: 0.55s;
            }
        }
    }
    ul {
        padding-top: 0.15rem;
        padding-left: 1.55rem;
        max-height: 150px;
        overflow-y: auto;
    }
    ul::-webkit-scrollbar {
        width: 0px;
        background: none;
    }
    ul::-webkit-scrollbar-track {
        background: none;
    }

    li {
        padding: 0.15rem;
        font-size: 0.875rem;
    }
    li a {
        color: ${theme.textGray};
        &:hover {
            color: ${theme.primaryColor};
            border-bottom: 0.5px solid rgba(143, 254, 191, 0.47);
            transition: 0.55s;
            transition-property: color, border-bottom;
        }
    }
`;
