import palette, { brandColor, darkText, lightText } from '../palette';

export interface ITheme {
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

export const themeLight: Readonly<ITheme> = {
    primaryColor: brandColor,
    text: darkText.primary,
    textGray: palette.blueGrey[600],
    background: lightText.primary,
    grayBorder: palette.blueGrey[50],
    buttonText: darkText.primary,
    buttonTextHover: '#f8f7f4',
    buttonBorder: darkText.primary,
    buttonBg: darkText.primary,
    buttonBgHover: palette.blueGrey[900],
};

export const themeDark: Readonly<ITheme> = {
    primaryColor: '#3178c6',
    text: '#C9D1D9',
    textGray: '#C9D1D9',
    background: '#121212',
    grayBorder: palette.blueGrey[600],
    buttonText: '#C9D1D9',
    buttonTextHover: '#000',
    buttonBorder: '#C9D1D9',
    buttonBg: 'rgba(255,255,255,0)',
    buttonBgHover: '#C9D1D9',
};
