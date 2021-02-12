import * as React from "react";
import {
  FlatList as _DefaultList,
  FlatListProps,
  ListRenderItem,
} from "react-native";
import { Fonts, Styles } from "../constants/Styles";
import { TextSec, View } from "./Themed";

interface IFlatListProps<T> extends Partial<FlatListProps<T>> {
  readonly data: T[];
  readonly numColumns?: number;
  children: ListRenderItem<T>;
}

const FlatList = <T extends {}>({
  children,
  data,
  numColumns,
  ...props
}: IFlatListProps<T>) => {
  const ListEmptyComponent = () => {
    return (
      <View style={{ ...Styles.centerHV }}>
        <TextSec style={Fonts.body3}>List is Empty</TextSec>
      </View>
    );
  };

  return (
    <_DefaultList
      bounces={false}
      ListEmptyComponent={ListEmptyComponent}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={React.useCallback(children, [data])}
      {...props}
    />
  );
};

export default FlatList;
