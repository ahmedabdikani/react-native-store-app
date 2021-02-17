import * as React from "react";

import Text from "../Theme/Text";
import { TextProps } from "../../types/Theme";
import { Fonts } from "../../constants/Styles";

interface Body2Props extends Pick<TextProps, "style" | "numberOfLines"> {}

const Body2: React.FC<Body2Props> = ({ children, style, numberOfLines }) => {
  return (
    <Text numberOfLines={numberOfLines} style={[Fonts.body2, style]}>
      {children}
    </Text>
  );
};

export default Body2;
