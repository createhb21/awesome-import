/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import logo from '../../logo.svg';

const Main = () => {
    return (
        <div css={wrapperStyle}>
            <header>
                <h1>Hey, I'm Bummy 👷</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat consequatur tempore culpa, consectetur dolores nam praesentium veritatis in quam nesciunt! Reiciendis </p>
            </header>
            <div css={mainStyle}>
                <h2>
                    <span>👔</span>
                    I've worked at
                </h2>
                <ul css={ulStyle}>
                    <li css={listStyle}>
                        <div>
                            <h3>Abroad</h3>
                            <div css={portFolioStyle}>
                                <p>Web Frontend Lead | 2021.06 - Now</p>
                            </div>
                        </div>
                    </li>
                    <li css={listStyle}>
                        <div>
                            <h3>CtrlF</h3>
                            <div css={portFolioStyle}>
                                <p>Web Frontend Lead | 2021.07 - Now</p>
                            </div>
                        </div>
                    </li>
                    <li css={listStyle}>
                        <div>
                            <h3>PAYDAY</h3>
                            <div css={portFolioStyle}>
                                <p>Web Frontend Lead | 2021.12 - Now</p>
                            </div>
                        </div>
                    </li>
                    <li css={listStyle}>
                        <div>
                            <h3>Abroad</h3>
                            <div css={portFolioStyle}>
                                <p>Web Frontend Lead | 2021.06 - Now</p>
                            </div>
                        </div>
                    </li>
                    <li css={listStyle}>
                        <div>
                            <h3>CtrlF</h3>
                            <div css={portFolioStyle}>
                                <p>Web Frontend Lead | 2021.07 - Now</p>
                            </div>
                        </div>
                    </li>
                    <li css={listStyle}>
                        <div>
                            <h3>PAYDAY</h3>
                            <div css={portFolioStyle}>
                                <p>Web Frontend Lead | 2021.12 - Now</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Main;

const portFolioStyle = css`
    white-space: nowrap;
    margin-left: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 60%;
    color: rgba(22, 37, 68, 0.77);
    overflow: hidden;

    & > p {
        margin: 0;
    }
`;

const listStyle = css`
    padding-left: 1rem;
    padding: 1rem;
    border-top: 0.1px solid #e5e7eb;

    &:last-child {
        border-bottom: 0.1px solid #e5e7eb;
    }
    & > div {
        display: flex;
        align-items: center;

        & > h3 {
            margin: 0;
            width: 10rem;
            white-space: nowrap;
            font-weight: 700;
            font-size: 1.125rem;
            line-height: 1.75rem;
        }
    }
`;

const ulStyle = css`
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-color: rgba(229, 231, 235, 0.41);
`;
const mainStyle = css`
    padding-top: 1rem;
    padding-bottom: 1rem;

    & > h2 {
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        margin-bottom: 2.5rem;
        line-height: 1.25rem;
        font-size: 1.25rem;
        font-weight: 700;
        display: inline-block;
        /* background-color: rgba(190, 139, 248, 0.322); */
        background-color: rgba(49, 120, 198, 0.332);

        & > span {
            margin-right: 0.5rem;
        }
    }
`;

const wrapperStyle = css`
    width: 100%;
    margin-top: 1.525rem;
    margin-right: auto;
    margin-left: auto;
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
            color: rgba(107, 114, 128, 0.77);
            font-size: 1rem;
            line-height: 1.5rem;
        }
    }
`;
