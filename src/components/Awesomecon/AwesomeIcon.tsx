import React from 'react';
import * as svg from './svg';

export type AwesomeIconType = keyof typeof svg;
export type AwesomeIconProps = {
    name: AwesomeIconType;
    className?: string;
    style?: React.CSSProperties;
};

function AwesomeIcon({ name, className, style }: AwesomeIconProps) {
    return React.createElement(svg[name], {
        className,
        style,
    });
}

export default AwesomeIcon;
