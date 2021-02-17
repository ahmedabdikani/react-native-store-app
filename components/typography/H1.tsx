import * as React from "react";

import Text from "../Theme/Text";
import { TextProps } from "../../types/Theme";
import { Fonts } from "../../constants/Styles";

interface H1Props extends Pick<TextProps, "style"> {}

const H1: React.FC<H1Props> = ({ children, style }) => {
  return <Text style={[Fonts.h1, style]}>{children}</Text>;
};

export default H1;
