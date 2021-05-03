import {Text, View} from "react-native"

export type TextProps = ThemeProps & Text["props"] & {underline?:boolean, lineThrough?:boolean, secondary?:boolean};
export type ViewProps = ThemeProps & View["props"] &{
  row?:boolean,
  transparent?:boolean,card?:boolean};

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  primary?:boolean;
};
