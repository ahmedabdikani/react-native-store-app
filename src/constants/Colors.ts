export const tintColorLight = '#FA6432';//"#E61D8C" 
const tintColorDark = tintColorLight;
export const lightBlue = '#0096C8';
export const lightRed = '#FA0064'
export const darkYellow =  '#F5AF00' //'#D69A18' 
export const lightGreen = '#25EC28'



export default {
  light: {
    dark:true,
    colors:{
      primary:tintColorLight,
      notification:tintColorLight,
      text: '#151515',
      textSecondary:'#565656',
      background: '#E0E0E0',
      card:'#FAFAFA',
      tint: tintColorLight,
      border:'#FAFAFA',

    }
  },
  dark: {
   dark:true,
   colors:{
    primary:tintColorDark,
    notification:tintColorDark,
    text: '#FAFAFA',
    border:'#282828',
    textSecondary:'#C0C0C0',
    background: '#050505',
    card:'#282828',
    tint: tintColorLight,
   }
  },
};
