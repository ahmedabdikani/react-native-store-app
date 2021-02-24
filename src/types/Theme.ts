import {Text, View} from "react-native"

export type TextProps = ThemeProps & Text["props"];
export type ViewProps = ThemeProps & View["props"];

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};
