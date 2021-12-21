import React, { useEffect, useState } from 'react';
import { mediaBlockRenderer } from '../AwesomeEditor/hooks/Media';
import { linkDecorator } from '../AwesomeEditor/hooks/Link';
import { Editor, EditorState, convertFromRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import styled from '@emotion/styled';

export type AwesomeRendererProps = {
    children: any;
    guest?: boolean;
};

function AwesomeRenderer({ children, guest }: AwesomeRendererProps) {
    const emptyState = EditorState.createEmpty(linkDecorator);
    const [editorState, setEditorState] = React.useState<EditorState>(emptyState);

    useEffect(() => {
        if (!guest) {
            const initialState = EditorState.createWithContent(convertFromRaw(children), linkDecorator);
            setEditorState(initialState);
        } else {
            const blocksFromHtml = htmlToDraft(children);
            if (blocksFromHtml) {
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState);
            }
        }
    }, [children]);

    return (
        <Fragment>
            <Editor editorState={editorState} onChange={setEditorState} blockRendererFn={mediaBlockRenderer} readOnly={true} />
        </Fragment>
    );
}

export default AwesomeRenderer;

const Fragment = styled.div``;
