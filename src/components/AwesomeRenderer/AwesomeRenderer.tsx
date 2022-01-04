/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { mediaBlockRenderer } from '../AwesomeEditor/hooks/Media';
import { linkDecorator } from '../AwesomeEditor/hooks/Link';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import media from '../../lib/styles/media';
import { font } from '../../lib/styles/font';
import { ITheme } from '../../lib/styles/Theme';
import { css, useTheme } from '@emotion/react';

export type AwesomeRendererProps = {
    children: any;
    guest?: boolean;
};

function AwesomeRenderer({ children, guest }: AwesomeRendererProps) {
    const theme = useTheme();
    const emptyState = EditorState.createEmpty(linkDecorator);
    const [editorState, setEditorState] = React.useState<EditorState>(emptyState);

    useEffect(() => {
        const initialState = EditorState.createWithContent(convertFromRaw(JSON.parse(children)), linkDecorator);
        setEditorState(initialState);
    }, [children]);

    return (
        <div css={wrapperStyle(theme)}>
            <div className="editor-container">
                <div className="editor-inner">
                    <div className="content-container">
                        <Editor editorState={editorState} onChange={setEditorState} blockRendererFn={mediaBlockRenderer} readOnly={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AwesomeRenderer;

const wrapperStyle = (theme: ITheme) => css`
    text-align: center;
    max-width: 100%;
    position: relative;

    .DraftEditor-root {
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
        border-radius: 8px;
    }

    .editor-container .editor-inner {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .editor-container .editor-inner {
        border: none;
        border-radius: 4px;
        padding: 4px;
        margin: 0px 4px;
    }

    .editor-container .editor-inner .content-container blockquote {
        border-left: 5px solid #2196f3;
        background-color: #e3f2fd;
        padding: 15px 10px 15px 20px;
    }

    .content-container blockquote {
        font-size: 1rem;
        line-height: 0.2;
    }

    .editor-container .editor-inner .content-container pre {
        color: #abb2bf;
        padding: 10px;
        font-size: 0.785rem;
    }

    .editor-container .editor-inner .content-container pre:nth-of-type(odd) {
        font-family: monospace;
        background-color: #282c34;
    }

    .editor-container .editor-inner .content-container pre:nth-of-type(even) {
        font-family: monospace;
        background-color: #2d3138;
    }

    ${media.small} {
        .public-DraftEditor-content {
            font-size: ${font.mobileSmall} !important;
        }
    }
`;
