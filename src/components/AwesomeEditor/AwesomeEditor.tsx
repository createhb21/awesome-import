/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';
import 'moment/locale/ko';
import { css, useTheme } from '@emotion/react';
import { Editor, EditorState, RichUtils, AtomicBlockUtils, DraftEditorCommand, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { ITheme } from '../../lib/styles/Theme';
import { linkDecorator } from './hooks/Link';
import { mediaBlockRenderer } from './hooks/Media';
import AwesomePreview from '../AwesomePreview';
import { useDispatch, useSelector } from 'react-redux';
import { switchImageGetterMode, switchImageSetterMode } from '../../modules/ImageSetter';
import { guestBookCommentCreateApi, logPostCreateApi, writePostCreateApi } from '../../hooks/firebasePosting';
import { useNavigate } from 'react-router-dom';
import { RootReducerType } from '../..';
import { font } from '../../lib/styles/font';
import media from '../../lib/styles/media';

const TEXT_EDITOR_ITEM = 'text-editor-item';

export type Toggles = {
    [BOLD: string]: boolean;
    ITALIC: boolean;
    UNDERLINE: boolean;
    STRIKETHROUGH: boolean;
};

export type EditorProps = {
    guest?: boolean;
};

const TextEditor = ({ guest }: EditorProps): JSX.Element => {
    const theme = useTheme();
    const initialState = EditorState.createEmpty(linkDecorator);
    const [visiblePreview, setVisiblePreview] = React.useState<boolean>(false);
    const [editorState, setEditorState] = React.useState<EditorState>(initialState);

    const [blockButton, setBlockButton] = React.useState('');
    const [toggleButton, setToggleButton] = React.useState<Toggles>({
        BOLD: false,
        ITALIC: false,
        UNDERLINE: false,
        STRIKETHROUGH: false,
    });

    useEffect(() => {
        const inlineStyle = editorState.getCurrentInlineStyle();

        const BOLD = inlineStyle.has('BOLD');
        const ITALIC = inlineStyle.has('ITALIC');
        const UNDERLINE = inlineStyle.has('UNDERLINE');
        const STRIKETHROUGH = inlineStyle.has('STRIKETHROUGH');

        setToggleButton({ BOLD, ITALIC, UNDERLINE, STRIKETHROUGH });

        const currentSelection = editorState.getSelection();
        const currentKey = currentSelection.getStartKey();
        const currentBlock = editorState.getCurrentContent().getBlockForKey(currentKey);

        setBlockButton(currentBlock.getType());
    }, [editorState]);

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
        if (inlineStyle === null) return;
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
        e.preventDefault();
        if (blockType === null) return;
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const blockButtonOptions = [
        { name: 'H1', action: 'header-one' },
        { name: 'H2', action: 'header-two' },
        { name: 'H3', action: 'header-three' },
        { name: 'Normal', action: 'unstyled' },
        { name: 'quote', action: 'blockquote' },
        { name: 'code', action: 'code-block' },
        { name: 'Ordered List', action: 'ordered-list-item' },
        { name: 'Unordered List', action: 'unordered-list-item' },
        { name: 'align-left', action: 'left' },
        { name: 'align-center', action: 'center' },
        { name: 'align-right', action: 'right' },
    ];

    const toggleButtonOptions = [
        { name: 'bold', action: 'BOLD' },
        { name: 'italic', action: 'ITALIC' },
        { name: 'underline', action: 'UNDERLINE' },
        { name: 'strikethrough', action: 'STRIKETHROUGH' },
    ];

    const getBlockStyle = (block: any): string => {
        switch (block.getType()) {
            case 'left':
                return 'align-left';
            case 'center':
                return 'align-center';
            case 'right':
                return 'align-right';
            default:
                return 'unstyled';
        }
    };

    const collectionRef = useRef<HTMLSelectElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const { isUser, user } = useSelector((state: RootReducerType) => state.UserSetReducer);
    const handleSave = () => {
        const uid = user?.uid;
        const adminKey = process.env.REACT_APP_BASE_ADMIN_KEY! as string;
        const data = editorState.getCurrentContent();
        const cellection = collectionRef.current && collectionRef.current.value;

        if (guest) {
            guestCommentCreateApi(data);
            return;
        }

        switch (cellection) {
            case 'write':
                if (adminKey === uid) {
                    writeCreateApi(data, uid);
                } else alert('권한이 없습니다 😅');
                break;
            case 'log':
                if (adminKey === uid) {
                    logCreateApi(data, uid);
                } else alert('권한이 없습니다 😅');
                break;
            default:
                return false;
        }
    };

    const writeCreateApi = async (data: any, uid?: string) => {
        await writePostCreateApi(categoryRef, firstInputRef, data, uid).then(() => {
            navigate('/dev');
        });
    };

    const logCreateApi = async (data: any, uid?: string) => {
        await logPostCreateApi(firstInputRef, data, uid).then(() => {
            navigate('/log');
        });
    };

    const guestCommentCreateApi = async (data: any) => {
        await guestBookCommentCreateApi(data, firstInputRef, pwRef, setEditorState).then(() => {
            console.log('comment success');
        });
    };

    const handlePreview = () => {
        const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        localStorage.setItem(TEXT_EDITOR_ITEM, data);
        !visiblePreview ? setVisiblePreview(true) : setVisiblePreview(false);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        !visiblePreview && !guest ? dispatch(switchImageSetterMode()) : dispatch(switchImageGetterMode());

        return () => {
            dispatch(switchImageGetterMode());
        };
    }, [dispatch, guest, visiblePreview]);

    useEffect(() => {
        if (isUser !== false && firstInputRef.current) {
            firstInputRef.current.value = user?.displayName! as string;
        }
    }, [guest, user, isUser]);

    return (
        <div css={wrapperStyle(theme, visiblePreview, guest)}>
            <div className="editor-container">
                <div className="editor-inner">
                    <div className="toolbar-container">
                        <div>
                            {blockButtonOptions.map((buttonOption, index) => (
                                <button
                                    className="toolbar-inner"
                                    onMouseDown={e => handleBlockClick(e, buttonOption.action)}
                                    key={index}
                                    style={
                                        buttonOption.action === blockButton
                                            ? {
                                                  backgroundColor: '#c1c1c1',
                                              }
                                            : {
                                                  backgroundColor: theme.background,
                                              }
                                    }
                                >
                                    {buttonOption.name}
                                </button>
                            ))}
                            {toggleButtonOptions.map((buttonOption, index) => (
                                <button
                                    className="toolbar-inner"
                                    onMouseDown={e => handleTogggleClick(e, buttonOption.action)}
                                    key={index}
                                    style={
                                        toggleButton[buttonOption.action] === true
                                            ? {
                                                  backgroundColor: '#c1c1c1',
                                              }
                                            : {
                                                  backgroundColor: theme.background,
                                              }
                                    }
                                >
                                    {buttonOption.name}
                                </button>
                            ))}
                            <button
                                className="toolbar-inner"
                                onMouseDown={e => {
                                    e.preventDefault();
                                    handleInsertImage();
                                }}
                            >
                                image
                            </button>
                            <button
                                className="toolbar-inner"
                                disabled={editorState.getSelection().isCollapsed()}
                                onMouseDown={e => {
                                    e.preventDefault();
                                    handleAddLink();
                                }}
                            >
                                link
                            </button>
                            <button className="toolbar-inner" disabled={editorState.getUndoStack().size <= 0} onMouseDown={() => setEditorState(EditorState.undo(editorState))}>
                                ⏪
                            </button>
                            <button className="toolbar-inner" disabled={editorState.getRedoStack().size <= 0} onMouseDown={() => setEditorState(EditorState.redo(editorState))}>
                                ⏩
                            </button>
                        </div>
                    </div>
                    {!visiblePreview && (
                        <div className="user-info">
                            <input type="text" placeholder={!guest ? 'Title' : '닉네임'} ref={firstInputRef} />
                            {!guest && <input type="text" placeholder="category" ref={categoryRef} />}
                            {guest && <input type="password" placeholder="비밀번호" maxLength={15} ref={pwRef} />}
                        </div>
                    )}
                    {!visiblePreview ? (
                        <div className="content-container">
                            <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} blockStyleFn={getBlockStyle} blockRendererFn={mediaBlockRenderer} />
                        </div>
                    ) : (
                        <AwesomePreview />
                    )}
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
                    {!(guest || visiblePreview) && (
                        <select ref={collectionRef} className="select" name="theme" placeholder="Theme">
                            <option placeholder="write">write</option>
                            <option placeholder="log">log</option>
                        </select>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TextEditor;

const wrapperStyle = (theme: ITheme, visiblePreview: boolean, guest: boolean | undefined) => css`
    text-align: center;
    max-width: 100%;
    position: relative;
    margin-top: ${guest ? '' : '5rem'};

    .DraftEditor-root {
        margin: 1rem 0;
        margin-bottom: 2rem;
        border-radius: 0.5rem;
    }

    .public-DraftEditor-content {
        padding: 1.5rem;
        border: 1px solid ${theme.grayBorder};
        border-radius: 8px;
    }

    .editor-container .editor-inner {
        margin: 10px 0px 0px 0px;
        padding: 10px;
        -webkit-box-shadow: 0px 1px 4px rgba(19, 24, 48, 0.2);
        box-shadow: 0px 1px 4px rgba(19, 24, 48, 0.2);
        border-radius: 8px;
    }

    .editor-container .editor-inner .toolbar-container {
        margin-bottom: 10px;
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

    .editor-container .editor-inner .toolbar-container .toolbar-inner {
        border: none;
        border-radius: 4px;
        padding: 4px;
        margin: 0px 4px;
    }

    .editor-container .editor-inner .content-container blockquote {
        border-left: 5px solid ${theme.quoteBorder};
        background-color: ${theme.quoteBackground};
        padding: 15px 10px 15px 20px;
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

    .toolbar-inner {
        border: none;
        color: ${theme.textNormal};
        padding: 0.5rem 1rem;
        opacity: ${visiblePreview ? 0 : 1};
        pointer-events: ${visiblePreview ? 'none' : 'auto'};
        transition-duration: 0.2s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    .user-info {
        width: 100%;
        height: 3.5em;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;

        & > input {
            width: ${!guest ? '250px ' : '100px'};
            outline: none;
            padding: 5px;
            padding-left: 10px;
            border: 1px solid #eee;
            border-radius: 15px;
            color: ${theme.textNormal};
            background-color: ${theme.background};
        }

        & > input:last-child {
            width: 100px;
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

    .select {
        position: absolute;
        bottom: 25px;
        right: 7.7px;
        color: ${theme.textNormal};
        background-color: ${theme.background};
        border-radius: 15px;
        margin-left: 5rem;
        padding: 5px;
        padding-left: 10px;
        border: none;
        outline: none;
        font-size: ${font.Small};
    }

    ${media.small} {
        .select {
            font-size: ${font.mobileSmall} !important;
        }

        .public-DraftEditor-content {
            font-size: ${font.mobileSmall} !important;
        }

        .editor-container .editor-inner .content-container blockquote {
            border-left: 5px solid ${theme.quoteBorder};
            background-color: ${theme.quoteBackground};
            padding: 10px 10px 10px 20px;
        }

        .content-container blockquote {
            font-size: 0.7rem;
            line-height: 1rem;
            word-break: break-all;
            white-space: pre-wrap;
        }

        .editor-container .editor-inner .content-container pre {
            font-size: 0.6rem;
        }

        .editor-container .editor-inner .content-container pre pre::before {
            width: 50px;
            left: 19px;
        }
    }
`;
