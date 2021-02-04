import * as React from "react";
import { Pressable, PressableProps } from "react-native";

interface IButtonProps extends PressableProps {}

const Button: React.FC<IButtonProps> = ({ children, style, ...otherProps }) => {
  Pressable.propTypes;
  return (
    <Pressable
      {...otherProps}
      style={({ pressed }) => ({
        opacity: pressed ? 0.3 : 1,
      })}
    >
      {children}
    </Pressable>
  );
};
export default Button;
