/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { ITheme } from '../../lib/styles/Theme';

export type MainSectionListProps = {
    title: string;
    date: number;
};

function MainSectionList({ title, date }: MainSectionListProps) {
    const theme = useTheme();
    return (
        <li css={listStyle(theme)}>
            <div>
                <h3>{title}</h3>
                <div css={portFolioStyle(theme)}>
                    <p>Web Frontend Lead | {date} - Now</p>
                </div>
            </div>
        </li>
    );
}

export default MainSectionList;

const portFolioStyle = (theme: ITheme) => css`
    margin-left: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 60%;
    color: ${theme.textGray};
    overflow: hidden;
    word-break: break-all;

    & > p {
        margin: 0;
    }
`;

const listStyle = (theme: ITheme) => css`
    padding-left: 1rem;
    padding: 1rem;
    border-top: 0.1px solid ${theme.grayBorder};

    &:last-child {
        border-bottom: 0.1px solid ${theme.grayBorder};
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
