import React from 'react';
import { CompositeDecorator, DraftDecoratorComponentProps } from 'draft-js';

export const Link = (props: DraftDecoratorComponentProps) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a rel="noopener noreferrer" target="_blank" href={url} style={{ color: 'red' }}>
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
