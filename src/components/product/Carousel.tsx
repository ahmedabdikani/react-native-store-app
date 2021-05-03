import React, { useState } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Image } from "react-native";
import {
  PinchGestureHandler,
  gestureHandlerRootHOC,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import { Product } from "../../types/Product";
import Layout from "../../constants/Layout";
import ListAnimated from "../list/ListAnimated";
import CarouselItem from "./CarouselItem";
import Pagination from "./Pagination";
import View from "../theme/View";
import Modal from "../../components/modal/Modal";

const { width, height } = Layout.window;
const imageHeight = height / 2;

interface CarouselProps {
  images: Product["images"];
}

const Carousel = ({ images }: CarouselProps) => {
  const x = useSharedValue<number>(0);
  const [visible, setVisible] = useState(false);
  const [imgUri, setImgUri] = useState(images[0]);
  const onScroll = useAnimatedScrollHandler({
    onMomentumEnd: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  const onGestureEvent = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>(
    {
      onActive: (cotext) => {
        console.log(cotext);
      },
      onStart: (cotext) => {
        console.log(cotext);
      },
    }
  );

  const openModel = (uri: string) => {
    setVisible(true);
    setImgUri(uri);
  };

  return (
    <View>
      {visible && (
        <Modal visible={visible} setVisible={setVisible}>
          {/* <GestureHandlerRootView style={{ width: "100%", height: "100%" }}> */}
          <FullScreenImage imgUri={imgUri} />
          {/* </GestureHandlerRootView> */}
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

const FullScreenImage = ({ imgUri }) => {
  return (
    <PinchGestureHandler
      onGestureEvent={(e) => {
        console.log("from event", e.nativeEvent);
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: width, height: height / 1.8 }}
          source={{ uri: imgUri }}
        />
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default Carousel;
