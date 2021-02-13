import * as React from "react";
import {
  FlatList as _DefaultList,
  FlatListProps,
  ListRenderItem,
} from "react-native";
import { Fonts, Styles } from "../../constants/Styles";
import { TextSec, View } from "../Themed";

interface IFlatListProps<T> extends Omit<FlatListProps<T>, "renderItem"> {
  readonly data: T[];
  children: ListRenderItem<T>;
}

const FlatList = <T extends {}>({
  children,
  data,
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
