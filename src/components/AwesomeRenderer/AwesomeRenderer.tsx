/** @jsxImportSource @emotion/react */
import Axios from 'axios';
import { css, useTheme } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { linkDecorator } from '../AwesomeEditor/hooks/Link';
import { mediaBlockRenderer } from '../AwesomeEditor/hooks/Media';
import { ITheme } from '../../lib/styles/Theme';
import { fetchPostData } from '../../modules/FetchPostData';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerType } from '../../';

const TEXT_EDITOR_ITEM = 'text-editor-item';

function AwesomeRenderer() {
    const postReducer = useSelector((state: RootReducerType) => state.FetchPostReducer);
    const initialState = EditorState.createEmpty(linkDecorator);
    const dispatch = useDispatch();
    const [editorState, setEditorState] = React.useState<EditorState>(initialState);

    useEffect(() => {
        dispatch(fetchPostData('write'));
    }, []);
    return (
        <div>
            {postReducer.success && (
                <div>
                    <div>
                        <p>{postReducer.posts?.title}</p>
                        <p>{postReducer.posts?.starCount}</p>
                        <p>{postReducer.posts?.date}</p>
                    </div>
                    <div>
                        {postReducer.posts?.body && (
                            <Editor
                                editorState={EditorState.createWithContent(convertFromRaw(postReducer.posts?.body), linkDecorator)}
                                onChange={setEditorState}
                                blockRendererFn={mediaBlockRenderer}
                                readOnly={true}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AwesomeRenderer;
