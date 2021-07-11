import Color from 'color'

export const tintColorLight = '#FA6432';
export const lightBlue = '#0090D6'
export const lightRed = '#FB3A4D'
export const pink = '#F2A1AD'
export const darkYellow = '#F5AF00'
export const lightGreen = '#69C743'
export const white = '#FAFAFA'
export const darkerWhite = '#E0E0E0'
export const danger = '#ff0033'
export const gray = Color().gray(40).toString()
export const black = Color().black(1000).toString()
export const lightenGreen = Color(lightGreen).lighten(0.7).toString()
// 151515
// 565656
export default {
  light: {
    dark: true,
    colors: {
      primary: tintColorLight,
      notification: tintColorLight,
      text: black,
      textSecondary: gray,
      background: darkerWhite,
      card: white,
      tint: tintColorLight,
      border: white,

    }
  },
  dark: {
    dark: true,
    colors: {
      primary: tintColorLight,
      notification: tintColorLight,
      text: white,
      border: '#282828',
      textSecondary: '#C0C0C0',
      background: '#050505',
      card: '#282828',
      tint: tintColorLight,
    }
  },
};
