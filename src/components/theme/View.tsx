import * as React from "react";
import { View as DefaultView } from "react-native";
import { tintColorLight } from "../../constants/Colors";

import useThemeColor from "../../hooks/useThemeColor";
import { ViewProps } from "../../types/Theme";

const View: React.FC<ViewProps> = (props) => {
  const {
    primary,
    transparent,
    style,
    lightColor,
    darkColor,
    ...otherProps
  } = props;
  const backgroundColor = transparent
    ? "transparent"
    : primary
    ? tintColorLight
    : useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default View;
