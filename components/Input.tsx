import * as React from "react";
import { TextInput, TextInputProps } from "react-native";
import { Fonts } from "../constants/Styles";
import { useThemeColor } from "./Themed";

interface IInputProps extends TextInputProps {}

const Input: React.FC<IInputProps> = ({ style, ...otherProps }) => {
  const color = useThemeColor({}, "text");

  return (
    <TextInput
      {...otherProps}
      placeholderTextColor={color}
      style={{ color, ...Fonts.body2, flex: 1, ...(style as {}) }}
    />
  );
};
export default Input;
