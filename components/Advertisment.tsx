import { types } from "@babel/core";
import * as React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  Extrapolate,
  Value,
  interpolate,
  interpolateColor,
  withSpring,
  withTiming,
  withRepeat,
  withDelay,
} from "react-native-reanimated";

import Colors, { tintColorLight } from "../constants/Colors";
import Layout from "../constants/Layout";
import { CardView, View } from "./Themed";

const img1 = require("../assets/images/ad1.jpg");
const img2 = require("../assets/images/ad2.jpg");
const img3 = require("../assets/images/ad3.jpg");
const img4 = require("../assets/images/ad4.webp");
const img5 = require("../assets/images/ad5.jpg");
const img6 = require("../assets/images/ad6.jpg");
const img7 = require("../assets/images/ad7.jpg");
const { width, height } = Layout.window;
const margin = 10;
const radius = 20;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface IAdvertismentProps {}

const Advertisment = ({}: IAdvertismentProps) => {
  const cardWidth = (width - margin * 4) / 2;
  const cardHeight = cardWidth * 1.5;
  const ref = React.useRef();
  const index = useSharedValue(0);
  const valX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onEndDrag: ({ contentOffset }) => {
      valX.value = contentOffset.x;
      index.value = Math.ceil((contentOffset.x / cardWidth) * 0.9);
      console.log(index.value);
    },
  });

  React.useEffect(() => {
    // index.value = withRepeat(withSpring(2), -1, true);

    return () => {};
  }, [index]);

  // height: cardHeight
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            overflow: "hidden",

            width: cardWidth, // + margin * 2,
            height: cardHeight,
            marginRight: margin,
            borderRadius: radius,
          }}
        >
          <AnimatedFlatList
            ref={ref}
            style={{ width: cardWidth }}
            horizontal={true}
            pagingEnabled={true}
            scrollEventThrottle={16}
            getItemLayout={(_, index) => ({
              index,
              length: cardWidth,
              offset: index * cardWidth,
            })}
            onScroll={onScroll}
            showsHorizontalScrollIndicator={false}
            data={[img1, img2, img3]}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity activeOpacity={0.6}>
                  <View>
                    <Image
                      source={item}
                      style={{
                        // borderRadius: radius,
                        height: cardHeight,
                        width: cardWidth,
                        resizeMode: "cover",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(_, index: number) => index.toString()}
          />

          <View
            style={{
              left: cardWidth / 2 - 45 / 2,
              bottom: 10,
              position: "absolute",
              flexDirection: "row",
              // justifyContent: "center",
              // alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            {[1, 2, 3].map((_, i) => {
              const bg = tintColorLight;

              return <Ad index={index} bg={bg} i={i} key={i} />;
            })}
          </View>
        </View>
        <View
          style={{
            height: cardHeight,
            width: cardWidth,
          }}
        >
          <CardView
            style={{
              flexDirection: "row",
              borderRadius: radius,
              height: cardHeight / 2 - margin / 2,
              padding: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              source={img6}
              style={{
                width: (cardWidth * 0.8) / 2,
                height: cardWidth / 2.5,
                resizeMode: "contain",
              }}
            />
            <Image
              source={img7}
              style={{ width: (cardWidth * 0.8) / 2, height: cardWidth / 2.5 }}
            />
          </CardView>
          <CardView
            style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: margin,
              borderRadius: radius,
              height: cardHeight / 2 - margin / 2,
            }}
          >
            <Image
              source={img4}
              style={{ width: (cardWidth * 0.8) / 2, height: cardWidth / 2.5 }}
            />
            <Image
              source={img5}
              style={{ width: (cardWidth * 0.8) / 2, height: cardWidth / 2.5 }}
            />
          </CardView>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}></View>
    </View>
  );
};

const Ad = ({ index, bg, i }: { index: any; bg: string; i: number }) => {
  const styles = useAnimatedStyle(() => {
    // const index = Math.round(valX.value / cardWidth);
    const inputRange = [0, 1, 2];
    const scale = interpolate(
      index.value,
      inputRange,
      inputRange.map(() => (index.value === i ? 2 : 1), Extrapolate.CLAMP)
    );
    const bgc = interpolateColor(
      index.value,
      inputRange,
      inputRange.map(() => (index.value === i ? bg : "#fff"), Extrapolate.CLAMP)
    );
    return {
      transform: [
        {
          scale: withSpring(scale),
        },
      ],
      backgroundColor: bgc,
    };
  });

  return (
    <Animated.View
      key={i}
      style={[
        {
          marginRight: 10,
          width: 5,
          height: 5,
          backgroundColor: bg,
          borderRadius: 5,
        },
        styles,
      ]}
    />
  );
};

export default Advertisment;
