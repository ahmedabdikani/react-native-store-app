import * as React from "react";
import { FlatList, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  Extrapolate,
  interpolate,
  withTiming,
} from "react-native-reanimated";

import { useLanguage } from "../context/LanguageContex";
import { lightBlue, lightRed, tintColorLight } from "../constants/Colors";
import Layout from "../constants/Layout";
import { Sizes, Styles } from "../constants/Styles";
import Button from "./button/Button";
import AnimatedList from "./list/ListAnimated";
import { View } from "./theme";
import { Subtitle1 } from "./typography";

const img0 = require("../assets/images/carosel4.png");
const img1 = require("../assets/images/carosel1.png");
const img2 = require("../assets/images/carosel2.png");
const img3 = require("../assets/images/carosel3.png");
const img4 = require("../assets/images/ad4.png");
const img5 = require("../assets/images/ad5.png");
const img6 = require("../assets/images/ad6.png");
const img7 = require("../assets/images/ad10.png");

const { width } = Layout.window;
const margin = 10;
const padding = Sizes.base;
const radius = 20;
const cardWidth = (width - margin * 4) / 2;
const cardHeight = cardWidth * 1.5;
const carousel = [
  { img: img1, name: "Samsung Tvs" },
  { img: img2, name: "Fridges" },
  { img: img3, name: "Headphones" },
  { img: img0, name: "Laptops" },
];
const ads = [
  { images: [img4, img5], title: "Best Products", color: lightBlue },
  { images: [img6, img7], title: "Best Stores", color: lightRed },
];

interface IAdvertismentProps {}

const Advertisment = ({}: IAdvertismentProps) => {
  const ref = React.useRef<FlatList>();
  const index = useSharedValue(0);
  const x = useSharedValue(0);
  const { language } = useLanguage();
  ads[0].title = language.bestProducts;
  ads[1].title = language.bestStores;

  const onScroll = useAnimatedScrollHandler({
    onMomentumEnd: ({ contentOffset }) => {
      x.value = contentOffset.x;
      index.value = Math.round(contentOffset.x / cardWidth);
    },
  });

  React.useEffect(() => {
    // index.value = withRepeat(
    //   withTiming(index.value, { duration: 5000 }, (finished) => {
    //     console.log("run");
    //     if (index.value < 2) {
    //       index.value = index.value + 1;
    //     } else {
    //       index.value = 0;
    //     }
    //   }),
    //   -1,
    //   false
    // );
    //   const interval = setInterval(() => {
    //     if (index.value > 2) {
    //       index.value = 0;
    //       ref.current?.scrollToIndex({ index: 0 });
    //     } else {
    //       index.value = index.value + 1;
    //       ref.current?.scrollToIndex({ index: index.value + 1 });
    //     }
    //   }, 5000);
    //   return () => {
    //     clearInterval(interval);
    //   };
  }, [index]);

  return (
    <View>
      <View style={Styles.fRow}>
        <View
          style={{
            width: cardWidth,
            overflow: "hidden",
            borderRadius: radius,
            height: cardHeight,
            marginRight: margin,
          }}
        >
          <AnimatedList
            ref={ref}
            onScroll={onScroll}
            horizontal
            snapToInterval={cardWidth}
            decelerationRate={0}
            data={carousel}
          >
            {({ item, index }) => {
              return <CarouselItem item={item} />;
            }}
          </AnimatedList>
          <View
            style={{
              left: cardWidth / 2 - (carousel.length * 15) / 2,
              bottom: 10,
              position: "absolute",
              flexDirection: "row",
              backgroundColor: "transparent",
            }}
          >
            {carousel?.map((_, i) => (
              <Pagination index={index} i={i} key={i} />
            ))}
          </View>
        </View>
        <View
          style={{
            height: cardHeight,
            width: cardWidth,
          }}
        >
          {ads.map((adItem, i) => (
            <AdItem adItem={adItem} key={i} />
          ))}
        </View>
      </View>
    </View>
  );
};

const Pagination = ({
  index,
  i,
}: {
  index: Animated.SharedValue<number>;
  i: number;
}) => {
  const style = useAnimatedStyle(() => {
    const inputRange = [0, 1, 2, 3];
    const scale = interpolate(
      index.value,
      inputRange,
      inputRange.map(() => (index.value === i ? 2 : 1), Extrapolate.CLAMP)
    );
    const opacity = interpolate(
      index.value,
      inputRange,
      inputRange.map(() => (index.value === i ? 1 : 0.4), Extrapolate.CLAMP)
    );
    return {
      transform: [
        {
          scale: withTiming(scale),
        },
      ],
      opacity,
      backgroundColor: tintColorLight,
      marginRight: padding,
      width: 5,
      height: 5,
      borderRadius: 5,
    };
  });

  return <Animated.View style={style} />;
};

const CarouselItem = ({ item }: { item: typeof carousel[number] }) => {
  return (
    <Button>
      <View
        card
        style={[
          Styles.centerHV,
          {
            height: cardHeight,
          },
        ]}
      >
        <View
          card
          style={{
            backgroundColor: "pink",
            height: cardHeight / 1.8,
            width: cardHeight / 1.8,
            position: "absolute",
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
        <Subtitle1
          style={{
            position: "absolute",
            bottom: 30,
            fontFamily: "lobster",
          }}
        >
          {item.name}
        </Subtitle1>
      </View>
    </Button>
  );
};

const AdItem = ({ adItem }: { adItem: typeof ads[number] }) => {
  return (
    <View
      card
      style={{
        borderRadius: radius,
        height: cardHeight / 2 - margin / 2,
        padding: padding,
        marginBottom: padding,
      }}
    >
      <Subtitle1
        style={{
          fontFamily: "lobster",
          color: adItem.color,
          marginLeft: padding,
        }}
      >
        {adItem.title}
      </Subtitle1>
      <View
        card
        style={{
          marginTop: padding,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {adItem.images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={{
              width: (cardWidth * 0.8) / 2,
              height: cardWidth / 2.5,
              resizeMode: "cover",
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Advertisment;
