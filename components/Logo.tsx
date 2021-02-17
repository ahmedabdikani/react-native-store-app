import * as React from "react";

import { tintColorLight } from "../constants/Colors";
import { Sizes } from "../constants/Styles";
import { Text, View } from "./Theme";

const padding = Sizes.base;
const sizes = {
  l: 1,
  m: 0.6,
  s: 0.3,
};

interface ILogoProps {
  size?: keyof typeof sizes;
}

const Logo: React.FC<ILogoProps> = ({ size = "l" }) => {
  const ratio = sizes[size];

  return (
    <View style={{ marginBottom: padding * 10 * ratio }}>
      <Text
        style={{
          fontSize: 60 * ratio,
          fontWeight: "bold",
          textAlign: "center",
          elevation: 10,
        }}
      >
        Suri
      </Text>
      <Text
        style={{
          elevation: 10,
          color: tintColorLight,
          fontSize: 30 * ratio,
          fontFamily: "lobster",
          textAlign: "center",
        }}
      >
        Life made easier
      </Text>
    </View>
  );
};
export default Logo;
