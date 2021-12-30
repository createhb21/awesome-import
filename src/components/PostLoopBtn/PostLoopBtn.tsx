/** @jsxImportSource @emotion/react */
import { ITheme } from '../../lib/styles/Theme';
import { useNavigate } from 'react-router-dom';
import { css, useTheme } from '@emotion/react';
import { font } from '../../lib/styles/font';
import media from '../../lib/styles/media';

export type PostRoofBtnProps = {
    currentId: number;
    data: any;
};

function PostRoofBtn({ currentId, data }: PostRoofBtnProps) {
    const theme = useTheme();
    const navigate = useNavigate();
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
        font-size: ${font.Small};
        font-weight: 500;
        background-color: ${theme.primaryColor};
        cursor: pointer;
    }

    ${media.small} {
        & > button {
            font-size: ${font.mobileSmall} !important;
        }
    }
`;
