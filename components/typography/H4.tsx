import * as React from "react";

import Text from "../Theme/Text";
import { TextProps } from "../../types/Theme";
import { Fonts } from "../../constants/Styles";

interface H4Props extends Pick<TextProps, "style" | "numberOfLines"> {}

const H4: React.FC<H4Props> = ({ children, style, numberOfLines }) => {
  return (
    <Text numberOfLines={numberOfLines} style={[Fonts.h4, style]}>
      {children}
    </Text>
  );
};

export default H4;
