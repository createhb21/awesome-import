/** @jsxImportSource @emotion/react */
import { ITheme } from '../lib/styles/Theme';
import { useNavigate } from 'react-router-dom';
import { css, useTheme } from '@emotion/react';
import { useState } from 'react';

export type PostRoofBtnProps = {
    currentId: number;
};

function PostRoofBtn({ currentId }: PostRoofBtnProps) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [nextVisible, setNextVisible] = useState(true);
    const [previousVisible, setPreviousVisible] = useState(true);

    const roofToOtherPost = (num: boolean) => {
        num === true ? navigate(`/posts/${currentId + 1}`) : navigate(`/posts/${currentId - 1}`);
    };
    return (
        <div css={wrapperStyle(theme)}>
            <button onClick={() => roofToOtherPost(false)}>이전글</button>
            <button onClick={() => roofToOtherPost(true)}>다음글</button>
        </div>
    );
}

export default PostRoofBtn;

const wrapperStyle = (theme: ITheme) => css`
    margin-top: 5rem;
    display: flex;
    justify-content: space-between;

    & > button {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 50px;
        border: none;
        border-radius: 35px;
        font-size: 0.85rem;
        font-weight: 500;
        background-color: ${theme.primaryColor};
        cursor: pointer;
    }
`;
