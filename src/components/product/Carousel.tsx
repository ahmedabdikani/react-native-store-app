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
import Modal from "../../components/modal/Modal";
import { Image } from "react-native";

const { width, height } = Layout.window;
const imageHeight = height / 2;

interface CarouselProps {
  images: Product["images"];
}

const Carousel = ({ images }: CarouselProps) => {
  const x = useSharedValue<number>(0);
  const [visible, setVisible] = React.useState(true);
  const [imgUri, setImgUri] = React.useState(images[0]);
  const onScroll = useAnimatedScrollHandler({
    onMomentumEnd: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  const openModel = (uri: string) => {
    setVisible(true);
    setImgUri(uri);
  };

  return (
    <View>
      {visible && (
        <Modal visible={visible} setVisible={setVisible}>
          <Image
            style={{ width: width, height: height / 2 }}
            source={{ uri: imgUri }}
          />
        </Modal>
      )}
      <ListAnimated data={images} horizontal onScroll={onScroll} pagingEnabled>
        {({ item }) => {
          return (
            <CarouselItem
              openModel={openModel}
              uri={item}
              width={width}
              height={imageHeight}
            />
          );
        }}
      </ListAnimated>
      <Pagination x={x} total={images.length} width={width} />
    </View>
  );
};

export default Carousel;
