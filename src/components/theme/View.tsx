import * as React from "react";
import { View as DefaultView } from "react-native";
import { tintColorLight } from "../../constants/Colors";

import useThemeColor from "../../hooks/useThemeColor";
import { ViewProps } from "../../types/Theme";

const View: React.FC<ViewProps> = ({
  flexR,
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
  const flexDirection = flexR ? "row" : "column";
  return (
    <DefaultView
      style={[{ flexDirection, backgroundColor }, style]}
      {...otherProps}
    />
  );
};

export default View;
