/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { ContentBlock, ContentState } from 'draft-js';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { RootReducerType } from '../../../';

interface BlockComponentProps {
    contentState: ContentState;
    block: ContentBlock;
}

const imgWrapStyle = (width: number) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    & > img {
        width: ${width}%;
    }
`;

export const Image = (props: BlockComponentProps) => {
    const { block, contentState } = props;
    const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
    const [width, setWidth] = useState(80);
    const { isSetterMode } = useSelector((state: RootReducerType) => state.ImageSetterReducer);
    const location = window.location.pathname;

    const getSize = () => {
        if (!isSetterMode) return;
        const responseSize = prompt('Please enter your picture size');
        if (!responseSize) {
            return;
        }
        if (Number.isNaN(Number(responseSize))) {
            return;
        } else {
            setWidth(Number(responseSize));
        }
    };

    useEffect(() => {
        location === '/guestbook' && setWidth(45);
    }, [location]);

    return (
        <div css={imgWrapStyle(width)}>
            <img src={src} alt={src} role="presentation" onClick={getSize} />
        </div>
    );
};

const Media = (props: BlockComponentProps) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const type = entity.getType();

    let media = null;
    if (type === 'image') {
        media = <Image {...props} />;
    }

    return media;
};

export const mediaBlockRenderer = (block: ContentBlock) => {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }
    return null;
};
