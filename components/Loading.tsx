import * as React from "react";
import { ActivityIndicator } from "react-native";

import { useThemeColor, View } from "./Themed";

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
