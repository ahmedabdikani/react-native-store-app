import Colors from "../constants/Colors";
import useColorScheme from "./useColorScheme";

export default function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light.colors & keyof typeof Colors.dark.colors
) {
  const theme = useColorScheme(); //"light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme].colors[colorName];
  }
}