import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { linkDecorator } from '../AwesomeEditor/hooks/Link';
import { ITheme } from '../../lib/styles/Theme';
export type AwesomePreviewProps = {};

const TEXT_EDITOR_ITEM = 'text-editor-item';

function AwesomePreview({}: AwesomePreviewProps) {
    const theme = useTheme();
    const [visible, setVisible] = useState<boolean>(false);
    const data = localStorage.getItem(TEXT_EDITOR_ITEM)! as string;
    const initialState = data ? EditorState.createWithContent(convertFromRaw(JSON.parse(data)), linkDecorator) : EditorState.createEmpty(linkDecorator);
    const [editorState, setEditorState] = React.useState<EditorState>(initialState);

    useEffect(() => {
        setTimeout(() => setVisible(true), 700);

        return () => localStorage.removeItem(TEXT_EDITOR_ITEM);
    }, []);
    return (
        <div css={wrapperStyle(theme, visible)}>
            <Editor editorState={editorState} onChange={setEditorState} readOnly={true} />
        </div>
    );
}

export default AwesomePreview;

const wrapperStyle = (theme: ITheme, visible: boolean) => css`
    height: 100%;

    .DraftEditor-root {
        border: ${visible ? '0.2px solid #3ed3d2' : '1px solid #eee;'};
        transition: 0.7s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
