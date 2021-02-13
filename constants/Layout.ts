import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get("window")

export default {
  window: {
    width: Math.min(width, 600),
    height,
  },
  isSmallDevice: width < 375,
};
