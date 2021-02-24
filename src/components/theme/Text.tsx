import * as React from "react";
import { Text as DefaultText } from "react-native";

import useThemeColor from "../../hooks/useThemeColor";
import { TextProps } from "types/Theme";

const Text: React.FC<TextProps> = (props) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultText
      style={[{ color, textTransform: "capitalize" }, style]}
      {...otherProps}
    />
  );
};

export default Text;
