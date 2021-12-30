import React, { useEffect } from 'react';
import { mediaBlockRenderer } from '../AwesomeEditor/hooks/Media';
import { linkDecorator } from '../AwesomeEditor/hooks/Link';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import styled from '@emotion/styled';
import media from '../../lib/styles/media';
import { font } from '../../lib/styles/font';

export type AwesomeRendererProps = {
    children: any;
    guest?: boolean;
};

function AwesomeRenderer({ children, guest }: AwesomeRendererProps) {
    const emptyState = EditorState.createEmpty(linkDecorator);
    const [editorState, setEditorState] = React.useState<EditorState>(emptyState);

    useEffect(() => {
        const initialState = EditorState.createWithContent(convertFromRaw(JSON.parse(children)), linkDecorator);
        setEditorState(initialState);
    }, [children]);

    return (
        <Fragment>
            <Editor editorState={editorState} onChange={setEditorState} blockRendererFn={mediaBlockRenderer} readOnly={true} />
        </Fragment>
    );
}

export default AwesomeRenderer;

const Fragment = styled.div`
    ${media.small} {
        .public-DraftEditor-content {
            font-size: ${font.Small} !important;
        }
    }
`;
