/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { linkDecorator } from '../AwesomeEditor/hooks/Link';
import { mediaBlockRenderer } from '../AwesomeEditor/hooks/Media';
import { ITheme } from '../../lib/styles/Theme';

const TEXT_EDITOR_ITEM = 'text-editor-item';

function AwesomePreview() {
    const theme = useTheme();
    const [visible, setVisible] = useState<boolean>(false);
    const data = localStorage.getItem(TEXT_EDITOR_ITEM)! as string;
    const initialState = data ? EditorState.createWithContent(convertFromRaw(JSON.parse(data)), linkDecorator) : EditorState.createEmpty(linkDecorator);
    const [editorState, setEditorState] = React.useState<EditorState>(initialState);

    useEffect(() => {
        setTimeout(() => setVisible(true), 450);
        return () => localStorage.removeItem(TEXT_EDITOR_ITEM);
    }, []);
    return (
        <div css={wrapperStyle(theme, visible)}>
            <Editor editorState={editorState} onChange={setEditorState} blockRendererFn={mediaBlockRenderer} readOnly={true} />
        </div>
    );
}

export default AwesomePreview;

const wrapperStyle = (theme: ITheme, visible: boolean) => css`
    height: 100%;
    z-index: 30;

    .DraftEditor-root {
        border: ${visible ? '0.2px solid #3ed3d2' : '1px solid #eee;'};
        transition: 0.45s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
