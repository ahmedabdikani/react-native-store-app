import React from "react";
// import FastImage from "react-native-fast-image"
import { Image as DefaultImage, ImageProps as Props } from "react-native";

interface ImageProps extends Props {}

const Image: React.FC<ImageProps> = (props) => {
  return <DefaultImage {...props} />;
};
export default Image;
