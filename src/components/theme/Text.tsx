import * as React from "react";
import { Text as DefaultText } from "react-native";
import { tintColorLight } from "../../constants/Colors";

import useThemeColor from "../../hooks/useThemeColor";
import { TextProps } from "../../types/Theme";

const Text: React.FC<TextProps> = (props) => {
  const {
    secondary,
    underline,
    lineThrough,
    style,
    lightColor,
    darkColor,
    primary,
    ...otherProps
  } = props;
  const color = primary
    ? tintColorLight
    : secondary
    ? useThemeColor({ light: lightColor, dark: darkColor }, "textSecondary")
    : useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const textDecorationLine =
    (underline && "underline") ||
    (lineThrough && "line-through") ||
    (underline && lineThrough && "underline line-through") ||
    "none";
  return (
    <DefaultText
      style={[
        {
          color,
          textTransform: "capitalize",
          textDecorationLine,
        },
        style,
      ]}
      {...otherProps}
    />
  );
};

export default Text;
