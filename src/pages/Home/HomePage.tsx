/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import AppLayout from '../../components/AppLayout';
import Footer from '../../components/Footer';
import ProjectItem from '../../components/ProjectItem';
import { ITheme } from '../../lib/styles/Theme';

const HomePage = () => {
    const theme = useTheme();

    return (
        <div css={wrapperStyle(theme)}>
            <header>
                <h1>Hey, I'm Bummy 👷</h1>
                <p>안녕하세요 이효범 Createhb21입니다 😃 </p>
            </header>
            <div css={homePageStyle(theme)}>
                <h2>
                    <span>👔</span>
                    I've worked at
                </h2>
                <ul css={projectListStyle(theme)}>
                    <ProjectItem title="Abroad" date={2021.06} />
                    <ProjectItem title="CtrlF" date={2021.07} />
                    <ProjectItem title="PAYDAY" date={2021.12} />
                </ul>
            </div>
            <AppLayout.Footer>
                <Footer />
            </AppLayout.Footer>
        </div>
    );
};

export default HomePage;

const projectListStyle = (theme: ITheme) => css`
    list-style: none;
    margin: 0;
    padding: 0;
`;
const homePageStyle = (theme: ITheme) => css`
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
        background-color: ${theme.primaryColor};

        & > span {
            margin-right: 0.5rem;
        }
    }
`;

const wrapperStyle = (theme: ITheme) => css`
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
            color: ${theme.textGray};
            font-size: 1rem;
            line-height: 1.5rem;
        }
    }
`;
