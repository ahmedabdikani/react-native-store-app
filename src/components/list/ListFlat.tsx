import * as React from "react";
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
}

const ListFlat = <T extends {}>({
  children,
  data,
  ...props
}: ListFlatProps<T>) => {
  const ListEmptyComponent = () => {
    return (
      <View style={{ ...Styles.centerHV, flex: 1 }}>
        <Body1 secondary>List is Empty</Body1>
      </View>
    );
  };

  return (
    <_DefaultList
      bounces={false}
      ListEmptyComponent={ListEmptyComponent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={React.useCallback(children, [data])}
      {...props}
    />
  );
};

export default ListFlat;
