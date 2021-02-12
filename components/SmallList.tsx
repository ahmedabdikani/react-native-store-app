import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";

import { View } from "./Themed";

interface ISmallListProps<T> {
  data: T[];
  style?: StyleProp<ViewStyle>;
  children: (item: T, index?: number) => JSX.Element;
}

const SmallList = <T extends {}>({
  children,
  data,
  style,
}: ISmallListProps<T>) => {
  return (
    <View style={style}>
      {data.map((item, index) => children(item, index))}
    </View>
  );
};

export default SmallList;
