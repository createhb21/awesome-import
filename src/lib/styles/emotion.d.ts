import '@emotion/react';
import { Theme } from './Theme';

declare module '@emotion/react' {
    export interface Theme {
        primaryColor: string;
        text: string;
        textGray: string;
        background: string;
        grayBorder: string;
        buttonText: string;
        buttonTextHover: string;
        buttonBorder: string;
        buttonBg: string;
        buttonBgHover: string;
    }
}
