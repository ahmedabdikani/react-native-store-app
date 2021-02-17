import * as React from "react";
import { View as DefaultView } from "react-native";

import useThemeColor from "../../hooks/useThemeColor";
import { ViewProps } from "types/Theme";

const CardView: React.FC<ViewProps> = (props) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "card"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default CardView;
