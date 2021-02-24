import * as React from "react";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { Product } from "../../types/Product";
import Layout from "../../constants/Layout";
import ListAnimated from "../list/ListAnimated";
import CarouselItem from "./CarouselItem";
import Pagination from "./Pagination";
import View from "../theme/View";
const { width, height } = Layout.window;
const imageHeight = height / 2;

interface CarouselProps {
  images: Product["images"];
}

const Carousel = ({ images }: CarouselProps) => {
  const x = useSharedValue<number>(0);
  const onScroll = useAnimatedScrollHandler({
    onMomentumEnd: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  return (
    <View>
      <ListAnimated data={images} horizontal onScroll={onScroll} pagingEnabled>
        {({ item }) => {
          return <CarouselItem uri={item} width={width} height={imageHeight} />;
        }}
      </ListAnimated>
      <Pagination x={x} total={images.length} width={width} />
    </View>
  );
};

export default Carousel;
