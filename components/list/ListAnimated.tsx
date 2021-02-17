import * as React from "react";
import { FlatList, ListRenderItem } from "react-native";
import Animated from "react-native-reanimated";

const _AnimatedList = Animated.createAnimatedComponent(FlatList);

interface ListAnimatedProps<T> extends Omit<FlatList["props"], "renderItem"> {
  data: T[];
  children: ListRenderItem<T>;
}

const ListAnimated = React.forwardRef(
  <T extends {}>(
    { data, children, ...props }: ListAnimatedProps<T>,
    ref: React.Ref<FlatList>
  ) => {
    return (
      <_AnimatedList
        ref={ref}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_: T, index: number) => index.toString()}
        data={data}
        renderItem={React.useCallback(children, [data])}
        {...props}
      />
    );
  }
) as <T extends {}>(
  props: ListAnimatedProps<T>,
  ref: React.Ref<FlatList>
) => JSX.Element;

export default ListAnimated;
