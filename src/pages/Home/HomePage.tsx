/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import AppLayout from '../../components/AppLayout';
import Footer from '../../components/Footer';
import ProjectItem from '../../components/ProjectItem';
import media from '../../lib/styles/media';
import { ITheme } from '../../lib/styles/Theme';

const HomePage = () => {
    const theme = useTheme();

    return (
        <div css={wrapperStyle(theme)}>
            <header>
                <h1>👋 Welcome to @_Import!</h1>
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
    ${media.small} {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    width: 100%;
    margin-top: 1.525rem;
    margin-right: auto;
    margin-left: auto;
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
    }
`;
