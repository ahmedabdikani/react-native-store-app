import * as React from "react";
import { LinearGradient as _LinearGradient } from "expo-linear-gradient";
import { darkYellow, tintColorLight } from "../constants/Colors";
import { StyleProp, ViewStyle } from "react-native";

interface ILinearGradientProps {
  colors?: string[];
  style?: StyleProp<ViewStyle>;
}

const LinearGradient: React.FC<ILinearGradientProps> = ({
  children,
  style,
  colors = [tintColorLight, darkYellow],
}) => {
  return (
    <_LinearGradient
      style={[
        {
          flex: 1,
        },
        style,
      ]}
      start={{ x: 0.8, y: 0.0 }}
      end={{ x: 0.0, y: 0.0 }}
      colors={colors}
    >
      {children}
    </_LinearGradient>
  );
};
export default LinearGradient;
