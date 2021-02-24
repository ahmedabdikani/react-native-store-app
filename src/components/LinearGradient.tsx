import * as React from "react";
import { LinearGradient as _LinearGradient } from "expo-linear-gradient";
import { darkYellow, tintColorLight } from "../constants/Colors";

interface ILinearGradientProps {
  colors?: string[];
}

const LinearGradient: React.FC<ILinearGradientProps> = ({
  children,
  colors = [tintColorLight, darkYellow],
}) => {
  return (
    <_LinearGradient
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      start={{ x: 0.8, y: 0.0 }}
      end={{ x: 0.0, y: 0.0 }}
      colors={colors}
    >
      {children}
    </_LinearGradient>
  );
};
export default LinearGradient;
