import * as React from "react";
import { View as DefaultView } from "react-native";
import { tintColorLight } from "../../constants/Colors";

import useThemeColor from "../../hooks/useThemeColor";
import { ViewProps } from "../../types/Theme";

const View: React.FC<ViewProps> = ({
  row,
  card,
  primary,
  transparent,
  style,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const backgroundColor = transparent
    ? "transparent"
    : primary
    ? tintColorLight
    : card
    ? useThemeColor({ light: lightColor, dark: darkColor }, "card")
    : useThemeColor({ light: lightColor, dark: darkColor }, "background");
  const flexDirection = row ? "row" : "column";
  return (
    <DefaultView
      style={[{ backgroundColor, flexDirection }, style]}
      {...otherProps}
    />
  );
};

export default View;
