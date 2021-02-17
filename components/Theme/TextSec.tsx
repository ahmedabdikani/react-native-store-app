import * as React from "react";
import { Text as DefaultText } from "react-native";

import useThemeColor from "../../hooks/useThemeColor";
import { TextProps } from "types/Theme";

const TextSec: React.FC<TextProps> = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textSecondary"
  );

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export default TextSec;
