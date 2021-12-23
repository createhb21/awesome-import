/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { css, useTheme } from '@emotion/react';
import { Editor, EditorState, RichUtils, AtomicBlockUtils, DraftEditorCommand, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { ITheme } from '../../lib/styles/Theme';
import { linkDecorator } from './hooks/Link';
import { mediaBlockRenderer } from './hooks/Media';
import AwesomePreview from '../AwesomePreview';
import { useDispatch } from 'react-redux';
import { switchImageGetterMode, switchImageSetterMode } from '../../modules/ImageSetter';
import firebaseApp from '../../lib/storage/firebase';
import { child, getDatabase, push, ref, set } from 'firebase/database';
import draftToHtml from 'draftjs-to-html';
import { FirebasePosting } from '../../hooks/firebasePosting';

const TEXT_EDITOR_ITEM = 'text-editor-item';

export type EditorProps = {
    guest?: boolean;
};

const TextEditor = ({ guest }: EditorProps) => {
    const theme = useTheme();
    const [visiblePreview, setVisiblePreview] = React.useState<boolean>(false);
    const initialState = EditorState.createEmpty(linkDecorator);
    const [editorState, setEditorState] = React.useState<EditorState>(initialState);

    const [userName, setUserName] = React.useState<string>('');
    const [password, setPassword] = React.useState<any>(null);

    const db = getDatabase(firebaseApp);
    const handleSave = () => {
        const newPostKey = push(child(ref(db), 'guestbook')).key;
        const commentTime = moment().format('YYYY년MM월DD일 HH:mm:ss');
        const data = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        const commentData = {
            userName,
            password,
            body: data,
            date: commentTime,
            starCount: 0,
            id: newPostKey,
        };
        // set(ref(db, 'guestbook/' + newPostKey), commentData);
        FirebasePosting('guestbook', commentData);
    };

    const handlePreview = () => {
        const data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        localStorage.setItem(TEXT_EDITOR_ITEM, data);
        !visiblePreview ? setVisiblePreview(true) : setVisiblePreview(false);
    };

    const handleInsertImage = () => {
        const src = prompt('Please enter the URL of your picture');
        if (!src) {
            return;
        }
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', { src });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });
        return setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
    };

    const handleAddLink = () => {
        const selection = editorState.getSelection();
        const link = prompt('Please enter the URL of your link');
        if (!link) {
            setEditorState(RichUtils.toggleLink(editorState, selection, null));
            return;
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
            url: link,
        });
        const newEditorState = EditorState.push(editorState, contentWithEntity, 'apply-entity');
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
    };

    const handleKeyCommand = (command: DraftEditorCommand) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const dispatch = useDispatch();
    useEffect(() => {
        !visiblePreview && !guest ? dispatch(switchImageSetterMode()) : dispatch(switchImageGetterMode());

        return () => {
            dispatch(switchImageGetterMode());
        };
    }, [dispatch]);

    return (
        <div css={wrapperStyle(theme, visiblePreview, guest)}>
            <button id="func" onMouseDown={e => handleBlockClick(e, 'header-one')}>
                H1
            </button>
            <button id="func" onMouseDown={e => handleBlockClick(e, 'header-two')}>
                H2
            </button>
            <button id="func" onMouseDown={e => handleBlockClick(e, 'header-three')}>
                H3
            </button>
            <button id="func" onMouseDown={e => handleBlockClick(e, 'unstyled')}>
                Normal
            </button>
            <button id="func" onMouseDown={e => handleTogggleClick(e, 'BOLD')}>
                bold
            </button>
            <button id="func" onMouseDown={e => handleTogggleClick(e, 'UNDERLINE')}>
                underline
            </button>
            <button id="func" onMouseDown={e => handleTogggleClick(e, 'ITALIC')}>
                italic
            </button>
            <button id="func" onMouseDown={e => handleTogggleClick(e, 'STRIKETHROUGH')}>
                strikthrough
            </button>
            <button id="func" onMouseDown={e => handleBlockClick(e, 'ordered-list-item')}>
                Ordered List
            </button>
            <button id="func" onMouseDown={e => handleBlockClick(e, 'unordered-list-item')}>
                Unordered List
            </button>
            {!guest && (
                <>
                    <button
                        id="func"
                        onMouseDown={e => {
                            e.preventDefault();
                            handleInsertImage();
                        }}
                    >
                        image
                    </button>
                    <button
                        id="func"
                        disabled={editorState.getSelection().isCollapsed()}
                        onMouseDown={e => {
                            e.preventDefault();
                            handleAddLink();
                        }}
                    >
                        link
                    </button>
                </>
            )}
            <button id="func" disabled={editorState.getUndoStack().size <= 0} onMouseDown={() => setEditorState(EditorState.undo(editorState))}>
                ⏪
            </button>
            <button id="func" disabled={editorState.getRedoStack().size <= 0} onMouseDown={() => setEditorState(EditorState.redo(editorState))}>
                ⏩
            </button>
            {guest && (
                <div className="user-info">
                    <input type="text" placeholder="닉네임" onChange={e => setUserName(e.target.value)} />
                    <input type="password" placeholder="비밀번호" onChange={e => setPassword(+e.target.value)} maxLength={15} />
                </div>
            )}
            {!visiblePreview ? <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} blockRendererFn={mediaBlockRenderer} /> : <AwesomePreview />}
            <button
                className="save"
                type="button"
                onClick={e => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                save
            </button>
            {!guest && (
                <button className="preview" onClick={handlePreview}>
                    {!visiblePreview ? 'Preview' : 'Write'}
                </button>
            )}
        </div>
    );
};

export default TextEditor;

const wrapperStyle = (theme: ITheme, visiblePreview: boolean, guest: boolean | undefined) => css`
    text-align: center;
    width: 40rem;

    & > #func {
        border: none;
        color: ${theme.textNormal};
        background-color: ${theme.background};
        padding: 0.5rem 1rem;
        opacity: ${visiblePreview ? 0 : 1};
        pointer-events: ${visiblePreview ? 'none' : 'auto'};
        transition-duration: 0.2s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    .DraftEditor-root {
        max-height: ${guest ? '115px' : '800px'};
        overflow-y: auto;
        border: 1px solid #eee;
        margin: 1rem 0;
        margin-bottom: 2rem;
        border-radius: 0.5rem;
    }

    .DraftEditor-editorContainer {
        padding: 1.5rem;
    }

    .public-DraftEditor-content {
        min-height: 20rem;
    }

    .user-info {
        width: 100%;
        height: 3.5em;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;

        & > input {
            width: 100px;
            outline: none;
            padding: 5px;
            padding-left: 10px;
            border: 1px solid #eee;
            border-radius: 15px;
            color: ${theme.textNormal};
            background-color: ${theme.background};
        }

        & > input:last-child {
            margin-left: 1em;
        }
    }

    .save,
    .preview {
        border: none;
        padding: 0.5rem 1rem;
        margin: auto 0.5rem;
        background-color: #3ed3d2;
        color: white;
        border-radius: 0.5rem;
        cursor: pointer;
    }
`;
