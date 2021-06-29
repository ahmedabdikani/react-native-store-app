import React from 'react';
import FastImage,{FastImageProps} from "react-native-fast-image"

interface ImageProps extends FastImageProps{ 
};

const Image:React.FC<ImageProps> = (props) => {

   return <FastImage {...props} />

}
export default Image