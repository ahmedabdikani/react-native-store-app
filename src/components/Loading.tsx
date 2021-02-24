import * as React from "react";
import { ActivityIndicator } from "react-native";

import { View } from "./theme";
import useThemeColor from "../hooks/useThemeColor";

interface ILoadingProps {}

const Loading = ({}: ILoadingProps) => {
  const color = useThemeColor({}, "text");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={color} size={"large"} />
    </View>
  );
};
export default Loading;
