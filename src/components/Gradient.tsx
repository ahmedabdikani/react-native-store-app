import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { darkYellow, tintColorLight } from "../constants/Colors";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

interface GradientProps {
  colors?: string[];
  style?: StyleProp<ViewStyle>;
}

const Gradient: React.FC<GradientProps> = ({
  children,
  colors = [tintColorLight, darkYellow],
  style,
}) => {
  return (
    <LinearGradient
      style={[styles.container, style]}
      start={{ x: 0.8, y: 0.0 }}
      end={{ x: 0.0, y: 0.0 }}
      colors={colors}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Gradient;
