/** @jsxImportSource @emotion/react */
import React from 'react';
import { CompositeDecorator, DraftDecoratorComponentProps } from 'draft-js';
import randomColor from 'randomcolor';
import { css } from '@emotion/react';

const getColorStyle = (randomLinkColor: string) => css`
    color: ${randomLinkColor};
`;

export const Link = (props: DraftDecoratorComponentProps) => {
    const randomLinkColor = randomColor();

    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a rel="noopener noreferrer" target="_blank" href={url} css={getColorStyle(randomLinkColor)}>
            {props.children}
        </a>
    );
};

export const linkDecorator = new CompositeDecorator([
    {
        strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges(character => {
                const entityKey = character.getEntity();
                return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
            }, callback);
        },
        component: Link,
    },
]);
