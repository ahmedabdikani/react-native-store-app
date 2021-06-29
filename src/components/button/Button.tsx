import * as React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { tintColorLight } from "../../constants/Colors";

interface ButtonProps extends Omit<PressableProps, "style"> {
  style?: StyleProp<ViewStyle>;
  primary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  primary,
  children,
  style,
  ...props
}) => {
  const backgroundColor = primary ? tintColorLight : "transparent";
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        {
          opacity: pressed || props.disabled ? 0.3 : 1,
          backgroundColor,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};
export default Button;
