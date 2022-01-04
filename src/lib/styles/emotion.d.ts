import '@emotion/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Theme } from './Theme';

declare module '@emotion/react' {
    export interface Theme {
        primaryColor: string;
        text: string;
        textGray: string;
        textNormal: string;
        mainContentText: string;
        background: string;
        grayBorder: string;
        buttonText: string;
        buttonTextHover: string;
        buttonBorder: string;
        buttonBg: string;
        buttonBgHover: string;
        quoteBorder: string;
        quoteBackground: string;
        codeBackground: string;
    }
}
