import * as React from "react";
import { TextInput, TextInputProps } from "react-native";
import { Fonts, Sizes } from "../../constants/Styles";
import useThemeColor from "../../hooks/useThemeColor";

const spacing = Sizes.base;

interface InputProps extends TextInputProps {}

const Input: React.FC<InputProps> = ({ style, ...otherProps }) => {
  const color = useThemeColor({}, "text");

  return (
    <TextInput
      {...otherProps}
      placeholderTextColor={color}
      style={[{ paddingLeft: spacing, color, ...Fonts.body2, flex: 1 }, style]}
    />
  );
};
export default Input;
