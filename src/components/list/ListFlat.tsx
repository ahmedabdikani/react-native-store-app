import React, { useCallback } from "react";
import {
  FlatList as _DefaultList,
  FlatListProps,
  ListRenderItem,
} from "react-native";
import { Styles } from "../../constants/Styles";
import { View } from "../theme";
import { Body1 } from "../typography";

interface ListFlatProps<T> extends Omit<FlatListProps<T>, "renderItem"> {
  readonly data: T[];
  children: ListRenderItem<T>;
  dependencies?: any[];
}

const ListFlat = <T extends {}>({
  children,
  data,
  dependencies,
  ...props
}: ListFlatProps<T>) => {
  const ListEmptyComponent = () => {
    return (
      <View style={{ ...Styles.centerHV, flex: 1 }}>
        <Body1 secondary>List is Empty</Body1>
      </View>
    );
  };

  dependencies = dependencies || [data];

  return (
    <_DefaultList
      bounces={false}
      ListEmptyComponent={ListEmptyComponent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={useCallback((_, index) => index.toString(), dependencies)}
      renderItem={useCallback(children, dependencies)}
      {...props}
    />
  );
};

export default ListFlat;
