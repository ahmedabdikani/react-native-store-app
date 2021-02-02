import * as React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  Extrapolate,
  interpolate,
  interpolateColor,
  withSpring,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

import Colors, {
  lightBlue,
  lightGreen,
  lightRed,
  tintColorLight,
} from "../constants/Colors";
import Layout from "../constants/Layout";
import { Fonts, Sizes } from "../constants/Styles";
import { CardView, Text, TextSec, useThemeColor, View } from "./Themed";

const img1 = require("../assets/images/carosel1.png");
const img2 = require("../assets/images/carosel2.png");
const img3 = require("../assets/images/carosel3.png");
const img0 = require("../assets/images/carosel4.png");
const img4 = require("../assets/images/ad4.png");
const img5 = require("../assets/images/ad5.png");
const img6 = require("../assets/images/ad6.png");
const img7 = require("../assets/images/ad10.png");
const { width, height } = Layout.window;
const margin = 10;
const padding = Sizes.base;
const radius = 20;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const carousel = [
  { img: img1, name: "Samsung Tvs" },
  { img: img2, name: "Fridges" },
  { img: img3, name: "Headphones" },
  { img: img0, name: "Laptops" },
];

interface IAdvertismentProps {}

const Advertisment = ({}: IAdvertismentProps) => {
  const cardWidth = (width - margin * 4) / 2;
  const cardHeight = cardWidth * 1.5;
  const ref = React.useRef();
  const index = useSharedValue(0);
  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onMomentumEnd: ({ contentOffset }) => {
      x.value = contentOffset.x;
      index.value = Math.round(contentOffset.x / cardWidth);
    },
  });

  React.useEffect(() => {
    // index.value = withRepeat(withSpring(2), -1, true);

    const interval = setInterval(() => {
      if (index.value > 2) {
        index.value = 0;
        ref.current.scrollToIndex({ index: 0 });
      } else {
        index.value = index.value + 1;
        ref.current.scrollToIndex({ index: index.value + 1 });
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
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
            snapToInterval={cardWidth}
            decelerationRate={0}
            scrollEventThrottle={16}
            onScroll={onScroll}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            data={carousel}
            renderItem={({ item, index }) => {
              // const color = useThemeColor({}, "text");
              return (
                <TouchableOpacity activeOpacity={0.6}>
                  <CardView
                    style={{
                      alignItems: "center",
                      height: cardHeight,
                      justifyContent: "center",
                    }}
                  >
                    <CardView
                      style={{
                        backgroundColor: "pink",
                        height: cardHeight / 1.8,
                        position: "absolute",
                        // top: 0,
                        width: cardHeight / 1.8,
                        borderRadius: cardWidth,
                      }}
                    />
                    <Image
                      source={item.img}
                      style={{
                        backgroundColor: "transparent",
                        height: cardHeight * 0.9,
                        width: cardWidth + 1,
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{
                        // color: "#000",
                        position: "absolute",
                        bottom: 30,
                        // ...Fonts.h3,
                        ...Fonts.body1,
                        fontFamily: "lobster",
                      }}
                    >
                      {item.name}
                    </Text>
                  </CardView>
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
            {carousel?.map((_, i) => {
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
              borderRadius: radius,
              height: cardHeight / 2 - margin / 2,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "lobster",
                ...Fonts.body2,
                color: lightBlue,
                marginLeft: padding,
              }}
            >
              Best store
            </Text>
            <CardView
              style={{
                marginTop: padding,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={img6}
                style={{
                  width: (cardWidth * 0.8) / 2,
                  height: cardWidth / 2.5,
                  resizeMode: "cover",
                }}
              />
              <Image
                source={img7}
                style={{
                  width: (cardWidth * 0.8) / 2,
                  height: cardWidth / 2.5,
                }}
              />
            </CardView>
          </CardView>
          <CardView
            style={{
              padding: 10,
              marginTop: margin,
              borderRadius: radius,
              height: cardHeight / 2 - margin / 2,
            }}
          >
            <Text
              style={{
                fontFamily: "lobster",
                ...Fonts.body2,
                color: lightRed,
                marginLeft: padding,
              }}
            >
              Best products
            </Text>
            <CardView
              style={{
                marginTop: padding,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={img4}
                style={{
                  width: (cardWidth * 0.8) / 2,
                  height: cardWidth / 2.5,
                }}
              />
              <Image
                source={img5}
                style={{
                  width: (cardWidth * 0.8) / 2,
                  height: cardWidth / 2.5,
                }}
              />
            </CardView>
          </CardView>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}></View>
    </View>
  );
};

const Ad = ({ index, bg, i }: { index: any; bg: string; i: number }) => {
  const styles = useAnimatedStyle(() => {
    const inputRange = [0, 1, 2, 3];
    const scale = interpolate(
      index.value,
      inputRange,
      inputRange.map(() => (index.value === i ? 2 : 1), Extrapolate.CLAMP)
    );
    const bgc = interpolateColor(
      index.value,
      inputRange,
      inputRange.map(() => (index.value === i ? bg : "#000"), Extrapolate.CLAMP)
    );
    return {
      transform: [
        {
          scale: withTiming(scale),
        },
      ],
      backgroundColor: bgc,
    };
  });

  return (
    <Animated.View
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
