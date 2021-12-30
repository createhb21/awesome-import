/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { convertToRaw, Editor, EditorState } from 'draft-js';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootReducerType } from '../..';
import { guestBookCommentCreateApi } from '../../hooks/firebasePosting';
import { ITheme } from '../../lib/styles/Theme';

function AwesomeMobileEditor() {
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

    const firstInputRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const handleSave = async () => {
        const data = convertToRaw(editorState.getCurrentContent());

        await guestBookCommentCreateApi(data, firstInputRef, pwRef, setEditorState).then(() => {
            console.log('comment success');
        });
    };

    const { isUser, user } = useSelector((state: RootReducerType) => state.UserSetReducer);
    useEffect(() => {
        if (isUser !== false && firstInputRef.current) {
            firstInputRef.current.value = user?.displayName! as string;
        }
    }, [user, isUser]);

    return (
        <div css={wrapperStyle}>
            <div className="user-info">
                <input type="text" placeholder="닉네임" ref={firstInputRef} />
                <input type="password" placeholder="비밀번호" maxLength={15} ref={pwRef} />
            </div>
            <Editor editorState={editorState} onChange={setEditorState} />
            <button
                className="save"
                type="button"
                onClick={e => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                save
            </button>
        </div>
    );
}

export default AwesomeMobileEditor;

const wrapperStyle = (theme: ITheme) => css`
    text-align: center;
    max-width: 100%;
    position: relative;

    .user-info {
        width: 100%;
        height: 3.5em;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;

        & > input {
            width: 100px;
            outline: none;
            padding: 5px;
            padding-left: 10px;
            border: 1px solid #eee;
            border-radius: 15px;
            color: ${theme.textNormal};
            background-color: ${theme.background};
        }

        & > input:last-child {
            width: 100px;
            margin-left: 1em;
        }
    }

    .DraftEditor-root {
        max-height: 115px;
        overflow-y: auto;
        border: 1px solid #eee;
        margin: 1rem 0;
        margin-bottom: 2rem;
        border-radius: 0.5rem;
    }

    .DraftEditor-editorContainer {
        padding: 1.5rem;
    }

    .public-DraftEditor-content {
        min-height: 20rem;
    }

    .save {
        border: none;
        padding: 0.5rem 1rem;
        margin: auto 0.5rem;
        background-color: #3ed3d2;
        color: white;
        border-radius: 0.5rem;
        cursor: pointer;
    }
`;
