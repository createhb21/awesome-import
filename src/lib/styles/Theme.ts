import palette, { brandColor, darkText, lightText } from '../palette';

export interface ITheme {
    primaryColor: string;
    text: string;
    textNormal: string;
    textGray: string;
    mainContentText: string;
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
    text: 'black',
    textGray: '#4b5567',
    textNormal: darkText.primary,
    mainContentText: palette.blueGrey[600],
    background: lightText.primary,
    grayBorder: palette.blueGrey[50],
    buttonText: darkText.primary,
    buttonTextHover: lightText.primary,
    buttonBorder: darkText.primary,
    buttonBg: lightText.primary,
    buttonBgHover: '#C9D1D9',
};

export const themeDark: Readonly<ITheme> = {
    primaryColor: '#3178c6',
    text: 'white',
    textGray: '#BEBFC2',
    textNormal: lightText.primary,
    mainContentText: 'rgba(75, 85, 99, 0.97)',
    background: '#272A33',
    grayBorder: palette.blueGrey[600],
    buttonText: '#C9D1D9',
    buttonTextHover: '#000',
    buttonBorder: '#C9D1D9',
    buttonBg: '#161b22',
    buttonBgHover: palette.blueGrey[900],
};
