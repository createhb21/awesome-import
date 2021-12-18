import React from 'react';
import { mediaBlockRenderer } from '../AwesomeEditor/hooks/Media';
import { linkDecorator } from '../AwesomeEditor/hooks/Link';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';

export type AwesomeRendererProps = {
    children: any;
};

function AwesomeRenderer({ children }: AwesomeRendererProps) {
    const initialState = children ? EditorState.createWithContent(convertFromRaw(children), linkDecorator) : EditorState.createEmpty(linkDecorator);
    const [editorState, setEditorState] = React.useState<EditorState>(initialState);

    return (
        <React.Fragment>
            <Editor editorState={editorState} onChange={setEditorState} blockRendererFn={mediaBlockRenderer} readOnly={true} />
        </React.Fragment>
    );
}

export default AwesomeRenderer;
