import * as React from "react";

import Text from "../Theme/Text";
import { TextProps } from "../../types/Theme";
import { Fonts } from "../../constants/Styles";

interface TextButtonProps extends Pick<TextProps, "style" | "numberOfLines"> {}

const TextButton: React.FC<TextButtonProps> = ({
  children,
  style,
  numberOfLines,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[{ textTransform: "uppercase" }, Fonts.subtitle, style]}
    >
      {children}
    </Text>
  );
};

export default TextButton;
