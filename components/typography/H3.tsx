import * as React from "react";

import Text from "../Theme/Text";
import { TextProps } from "../../types/Theme";
import { Fonts } from "../../constants/Styles";

interface H3Props extends Pick<TextProps, "style" | "numberOfLines"> {}

const H3: React.FC<H3Props> = ({ children, style, numberOfLines }) => {
  return (
    <Text numberOfLines={numberOfLines} style={[Fonts.h3, style]}>
      {children}
    </Text>
  );
};

export default H3;
