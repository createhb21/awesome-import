import React from 'react';
import { mediaBlockRenderer } from '../../components/AwesomeEditor/hooks/Media';
import { linkDecorator } from '../../components/AwesomeEditor/hooks/Link';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

export type AwesomeRendererProps = {
    children: any;
};

function AwesomeRenderer({ children }: AwesomeRendererProps) {
    const initialState = children && EditorState.createWithContent(convertFromRaw(children), linkDecorator);
    const [editorState, setEditorState] = React.useState<EditorState>(initialState);
    console.log(children);

    return (
        <React.Fragment>
            <Editor editorState={editorState} onChange={setEditorState} blockRendererFn={mediaBlockRenderer} readOnly={true} />
        </React.Fragment>
    );
}

export default AwesomeRenderer;
