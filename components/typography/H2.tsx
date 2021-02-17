import * as React from "react";

import Text from "../Theme/Text";
import { TextProps } from "../../types/Theme";
import { Fonts } from "../../constants/Styles";

interface H2Props extends Pick<TextProps, "style"> {}

const H2: React.FC<H2Props> = ({ children, style }) => {
  return <Text style={[Fonts.h2, style]}>{children}</Text>;
};

export default H2;
