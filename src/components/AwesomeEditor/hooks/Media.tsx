/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { ContentBlock, ContentState } from 'draft-js';
import { css } from '@emotion/react';

interface BlockComponentProps {
    contentState: ContentState;
    block: ContentBlock;
}

const imgWrapStyle = css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    & > input {
        z-index: 999;
        position: absolute;
        right: 0;
        bottom: -30px;
        width: 5.5rem;
        height: 1rem;
    }
`;

const imgSize = (width: number | null) => css`
    width: ${width}px;
`;

export const Image = (props: BlockComponentProps) => {
    const { block, contentState } = props;
    const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
    const [width, setWidth] = useState(477);

    const getSize = () => {
        const responseSize = prompt('Please enter your picture size');
        if (Number.isNaN(Number(responseSize))) {
            return;
        } else {
            setWidth(Number(responseSize));
        }
    };

    return (
        <div css={imgWrapStyle}>
            <img src={src} alt={src} role="presentation" onClick={getSize} css={imgSize(Number(width))} />
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
