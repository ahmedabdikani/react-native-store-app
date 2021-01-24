import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const maxWidth = (width:number, max:number ) => (max < width) ? max: width 

export default {
  window: {
    width: maxWidth(width, 600 ),
    height,
  },
  isSmallDevice: width < 375,
};
