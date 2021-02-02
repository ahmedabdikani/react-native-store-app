import * as React from "react";
import { LinearGradient as _LinearGradient } from "expo-linear-gradient";
import { darkYellow, tintColorLight } from "../constants/Colors";
import { LinearGradientProps } from "react-native-svg";

interface ILinearGradientProps {}

const LinearGradient: React.FC<LinearGradientProps> = ({ children }) => {
  return (
    <_LinearGradient
      style={{
        flex: 1,
      }}
      start={{ x: 0.8, y: 0 }}
      end={{ x: 0.0, y: 0 }}
      colors={[tintColorLight, darkYellow]}
    >
      {children}
    </_LinearGradient>
  );
};
export default LinearGradient;
