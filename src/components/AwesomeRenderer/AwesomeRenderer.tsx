import React from 'react';
import { mediaBlockRenderer } from '../AwesomeEditor/hooks/Media';
import { linkDecorator } from '../AwesomeEditor/hooks/Link';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import styled from '@emotion/styled';

export type AwesomeRendererProps = {
    children: any;
};

function AwesomeRenderer({ children }: AwesomeRendererProps) {
    const initialState = children ? EditorState.createWithContent(convertFromRaw(children), linkDecorator) : EditorState.createEmpty(linkDecorator);
    const [editorState, setEditorState] = React.useState<EditorState>(initialState);

    return (
        <Fragment>
            <Editor editorState={editorState} onChange={setEditorState} blockRendererFn={mediaBlockRenderer} readOnly={true} />
        </Fragment>
    );
}

export default AwesomeRenderer;

const Fragment = styled.div``;
