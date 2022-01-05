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

    .editor-container .editor-inner {
        border-radius: 8px;
    }

    .editor-container .editor-inner {
        border: none;
        border-radius: 4px;
    }

    .editor-container .editor-inner .content-container blockquote {
        border-left: 5px solid ${theme.quoteBorder};
        background-color: ${theme.quoteBackground};
        padding: 10px 10px 10px 20px;
    }

    .content-container blockquote {
        font-size: 1rem;
        line-height: 1.625;
    }

    .editor-container .editor-inner .content-container pre {
        color: ${theme.textGray};
        padding: 7px;
        font-size: ${font.Small};
        background-color: ${theme.codeBackground};
        -webkit-box-shadow: 0px 1px 10px rgba(19, 24, 48, 0.35);
        box-shadow: 0px 1px 10px rgba(19, 24, 48, 0.35);
        border-radius: 8px;
    }

    .editor-container .editor-inner .content-container pre pre {
        background-color: ${theme.codeBackground};
        -webkit-box-shadow: 0.5px 0.5px 10px ${theme.grayBorder} -0.5px -0.5px 10px ${theme.grayBorder};
        box-shadow: 0px -0.7px 1px rgba(19, 24, 48, 0.25), 0px 0.25px 1px rgba(19, 24, 48, 0.25);
        border-radius: 8px;
        padding: 25px;
        padding-top: 45px;
        position: relative;
    }

    .editor-container .editor-inner .content-container pre pre::before {
        content: '🔴 🟡 🟢';
        width: 70px;
        display: inline-flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        top: 7px;
        left: 21px;
        box-shadow: 0px -1px 1px rgba(19, 24, 48, 0.25);
        border-radius: 8px;
    }

    .editor-container .editor-inner .content-container pre pre span {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New' !important;
    }

    ${media.small} {
        .public-DraftEditor-content {
            font-size: ${font.Small} !important;
        }

        .editor-container .editor-inner .content-container blockquote {
            padding-top: 5px;
            padding-bottom: 5px;
        }

        .content-container blockquote {
            font-size: 0.8rem;
            line-height: 1.1rem;
            word-break: break-all;
            white-space: pre-wrap;
        }

        .editor-container .editor-inner .content-container pre {
            font-size: 0.6rem;
        }

        .editor-container .editor-inner .content-container pre pre::before {
            width: 53px;
            left: 19px;
        }
    }
`;
