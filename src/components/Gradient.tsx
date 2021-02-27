import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { darkYellow, tintColorLight } from "../constants/Colors";
import { StyleProp, ViewStyle } from "react-native";

interface GradientProps {
  colors?: string[];
  style?: StyleProp<ViewStyle>;
}

const Gradient: React.FC<GradientProps> = ({
  children,
  colors = [tintColorLight, darkYellow],
  style,
}) => {
  return (
    <LinearGradient
      style={style}
      start={{ x: 0.8, y: 0.0 }}
      end={{ x: 0.0, y: 0.0 }}
      colors={colors}
    >
      {children}
    </LinearGradient>
  );
};
export default Gradient;
