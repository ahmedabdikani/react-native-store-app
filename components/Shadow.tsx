import * as React from "react";

import { View } from "./Theme";
import useThemeColor from "../hooks/useThemeColor";
import { StyleSheet } from "react-native";

const Shadow: React.FC = ({ children }) => {
  const color = useThemeColor({}, "text");
  return (
    <View style={[styles.container, { shadowColor: color }]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default Shadow;
