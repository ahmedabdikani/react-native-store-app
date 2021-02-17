import * as React from "react";

import Text from "../Theme/Text";
import { TextProps } from "../../types/Theme";

interface Body1Props extends Pick<TextProps, "style" | "numberOfLines"> {}

const Body1: React.FC<Body1Props> = ({ children, style, numberOfLines }) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[{ textDecorationLine: "underline" }, style]}
    >
      {children}
    </Text>
  );
};

export default Body1;
