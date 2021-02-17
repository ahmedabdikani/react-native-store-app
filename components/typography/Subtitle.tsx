import * as React from "react";

import Text from "../Theme/Text";
import { TextProps } from "../../types/Theme";
import { Fonts } from "../../constants/Styles";

interface SubtitleProps extends Pick<TextProps, "style" | "numberOfLines"> {}

const Subtitle: React.FC<SubtitleProps> = ({
  children,
  style,
  numberOfLines,
}) => {
  return (
    <Text numberOfLines={numberOfLines} style={[Fonts.subtitle, style]}>
      {children}
    </Text>
  );
};

export default Subtitle;
