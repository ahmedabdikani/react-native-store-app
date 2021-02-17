import * as React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";

interface ButtonProps extends Omit<PressableProps, "style"> {
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({ children, style, ...props }) => {
  Pressable.propTypes;
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1 }, style]}
    >
      {children}
    </Pressable>
  );
};
export default Button;
