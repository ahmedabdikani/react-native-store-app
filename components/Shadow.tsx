import * as React from "react";
import {} from "react-native";
import { useThemeColor, View } from "./Themed";

interface IShadowProps {}

const Shadow: React.FC = ({ children }) => {
  const color = useThemeColor({}, "text");
  return (
    <View
      style={{
        zIndex: 10,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: color,
        elevation: 10,
      }}
    >
      {children}
    </View>
  );
};
export default Shadow;
