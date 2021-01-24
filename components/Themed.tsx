import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light.colors & keyof typeof Colors.dark.colors
) {
  const theme = useColorScheme(); //"light"; //;
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme].colors[colorName];
  }
}

export const setTheme = ({ backgroundColor }: { backgroundColor?: string }) => {
  if (backgroundColor) {
    return (Colors.dark.colors.background = backgroundColor);
  } else {
    return Colors.dark.colors.background;
  }
};

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  // const backgroundColor = setTheme({});

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function CardView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "card"
  );

  // const backgroundColor = setTheme({});

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextSec(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textSecondary"
  );

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
