import * as React from "react";
import { TextInput, TextInputProps } from "react-native";
import { Fonts, Sizes } from "../../constants/Styles";
import useThemeColor from "../../hooks/useThemeColor";

const spacing = Sizes.spacing.s;

const Input: React.FC<TextInputProps> = ({ style, ...otherProps }) => {
  const color = useThemeColor({}, "textSecondary");

  return (
    <TextInput
      {...otherProps}
      placeholderTextColor={color}
      style={[
        {
          paddingLeft: spacing,
          color,
          flex: 1,
        },
        Fonts.body2,
        style,
      ]}
    />
  );
};
export default Input;
