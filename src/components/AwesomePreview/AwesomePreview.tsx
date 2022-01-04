/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { linkDecorator } from '../AwesomeEditor/hooks/Link';
import { mediaBlockRenderer } from '../AwesomeEditor/hooks/Media';
import { ITheme } from '../../lib/styles/Theme';
import { font } from '../../lib/styles/font';

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
            <div className="editor-container">
                <div className="editor-inner">
                    <div className="toolbar-container">
                        <div className="content-container">
                            <Editor editorState={editorState} onChange={setEditorState} blockRendererFn={mediaBlockRenderer} readOnly={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AwesomePreview;

const wrapperStyle = (theme: ITheme, visible: boolean) => css`
    text-align: center;
    max-width: 100%;
    position: relative;

    .DraftEditor-root {
        margin: 1rem 0;
        margin-bottom: 2rem;
        border-radius: 0.5rem;
    }

    .editor-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .editor-container .editor-inner {
        margin: 10px 0px 0px 0px;
        padding: 10px;
        -webkit-box-shadow: 0px 1px 4px rgba(19, 24, 48, 0.2);
        box-shadow: 0px 1px 4px rgba(19, 24, 48, 0.2);
        border-radius: 8px;
    }

    .editor-container .editor-inner .toolbar-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .editor-container .editor-inner .toolbar-container .toolbar-inner {
        border: none;
        border-radius: 4px;
        padding: 4px;
        margin: 0px 4px;
    }

    .editor-container .editor-inner .content-container .align-left div {
        text-align: left;
    }

    .editor-container .editor-inner .content-container .align-center div {
        text-align: center;
    }

    .editor-container .editor-inner .content-container .align-right div {
        text-align: right;
    }

    .editor-container .editor-inner .content-container blockquote {
        border-left: 5px solid #2196f3;
        background-color: #e3f2fd;
        padding: 15px 10px 15px 20px;
    }

    .editor-container .editor-inner .content-container pre {
        color: #abb2bf;
        padding: 10px;
        font-size: ${font.Medium};
    }

    .editor-container .editor-inner .content-container pre:nth-of-type(odd) {
        background-color: #282c34;
    }

    .editor-container .editor-inner .content-container pre:nth-of-type(even) {
        background-color: #2d3138;
    }
`;
