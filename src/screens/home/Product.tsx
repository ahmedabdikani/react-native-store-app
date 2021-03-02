import * as React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../../components/button/Button";
import { Card, View } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { darkYellow, tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Sizes, Styles } from "../../constants/Styles";
import { useCartContext } from "../../context/CartContext";
import { HomeNavigationProps } from "../../types/Home";
import { Product } from "../../types/Product";
import AnimatedList from "../../components/list/ListAnimated";
import { useProductContext } from "../../context/ProductContext";
import {
  Body2,
  ButtonText,
  Caption,
  H3,
  H4,
  H5,
  H6,
  Subtitle1,
  Subtitle2,
} from "../../components/typography";

import Center from "../../components/theme/Center";
import Carousel from "../../components/product/Carousel";
import { Details, MoreDetails } from "../../components/product/Details";
import useHideBottomBar from "../../hooks/useHideBottomBar";
import CommentList from "../../components/comment/CommentList";
import { SharedElement } from "react-navigation-shared-element";

const { width, height } = Layout.window;
const spacing = Sizes.base;
const imageHeight = height / 2;

const comments = Array.from({ length: 3 }, (_, index) => {
  return {
    id: index,
    user: {
      name: "user" + index,
      photo: "https://source.unsplash.com/random/" + index,
    },
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aut voluptates soluta similique ullam sapiente vel nemo quod voluptatum fuga officiis, sit rerum cum eum alias fugit laudantium.",
  };
});

interface ProductProps extends HomeNavigationProps<"Product"> {}

const ProductScreen = ({ navigation, route }: ProductProps) => {
  const { products } = useProductContext();
  const similarProduts = Array.from(
    { length: 6 },
    (_, index) => products[index]
  );
  const { product } = route.params;
  const y = useSharedValue(0);
  const { top } = useSafeAreaInsets();

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      y.value = contentOffset.y;
    },
  });

  React.useEffect(() => {
    const unSubscribe = useHideBottomBar(navigation);
    return () => {
      unSubscribe();
    };
  }, [navigation]);

  const SimilarProduts = () => {
    return (
      <Card
        style={{ margin: spacing, padding: spacing, borderRadius: spacing }}
      >
        <Card style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Subtitle1>Furniture Store</Subtitle1>
          <Button>
            <Subtitle2 underline primary>
              See more
            </Subtitle2>
          </Button>
        </Card>
        <Card
          style={{
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {similarProduts.map(renderSimilarProductItem)}
        </Card>
      </Card>
    );
  };

  const renderSimilarProductItem = (item: Product, index: number) => {
    return (
      <Button
        onPress={() => navigation.navigate("Product", { product })}
        key={index}
        style={{ margin: spacing }}
      >
        <Image
          source={{ uri: item.images[0] }}
          style={{
            height: 100,
            width: 100,
            resizeMode: "cover",
            borderRadius: spacing,
          }}
        />
        <Card style={{ width: 100 }}>
          <Caption numberOfLines={2} style={{ marginVertical: spacing * 0.5 }}>
            {item.title}
          </Caption>
          <Body2 primary>${item.price}</Body2>
        </Card>
      </Button>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header y={y} top={top} />
      <AnimatedList data={[0]} style={{ flex: 1 }} onScroll={onScroll}>
        {() => {
          return (
            <View style={{ flex: 1 }}>
              <SharedElement id={product.id.toString()}>
                <Carousel images={product.images} />
              </SharedElement>
              <Details product={product} />
              <CommentList comments={comments} />
              {SimilarProduts()}
              <MoreDetails product={product} />
            </View>
          );
        }}
      </AnimatedList>
      <Footer product={product} />
    </View>
  );
};

const Header = ({
  y,
  top,
}: {
  top: number;
  y: Animated.SharedValue<number>;
}) => {
  const backgroundColor = useThemeColor({}, "background");
  const color = useThemeColor({}, "text");
  const inputRange = [0, imageHeight / 2];
  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(y.value, inputRange, [0, 1], Extrapolate.CLAMP);
    return {
      position: "absolute",
      height: 100,
      paddingTop: top,
      backgroundColor,
      flex: 1,
      width,
      zIndex: 100,
      opacity,
      overflow: "hidden",
    };
  });
  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            y.value,
            inputRange,
            [100, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
      color,
      fontWeight: "bold",
      fontSize: 30,
    };
  });
  return (
    <Animated.View style={[Styles.centerH, containerStyle]}>
      <Animated.Text style={textStyle}>Banana</Animated.Text>
    </Animated.View>
  );
};

const Footer = ({ product }: { product: Product }) => {
  const { addProductToCart } = useCartContext();
  const textSecondary = useThemeColor({}, "textSecondary");
  const color = "#fff";
  return (
    <Card style={styles.footerContainer}>
      <FontAwesome5 name="store" color={tintColorLight} size={20} />
      <FontAwesome5 name="comment-dots" color={textSecondary} size={24} />
      <FontAwesome name="star" color={tintColorLight} size={24} />
      <Card
        style={{
          flexDirection: "row",
          marginVertical: spacing / 2,
        }}
      >
        <Button
          onPress={() => addProductToCart(product)}
          style={[
            styles.footerBtn,
            {
              borderBottomLeftRadius: spacing * 3,
              borderTopLeftRadius: spacing * 3,
              backgroundColor: darkYellow,
            },
          ]}
        >
          <Center>
            <ButtonText style={{ color }}>Send to cart</ButtonText>
          </Center>
        </Button>
        <Button
          style={[
            styles.footerBtn,

            {
              borderBottomRightRadius: spacing * 3,
              borderTopRightRadius: spacing * 3,
            },
          ]}
        >
          <Center>
            <ButtonText style={{ color }}>Puy item</ButtonText>
          </Center>
        </Button>
      </Card>
    </Card>
  );
};

ProductScreen.sharedElements = (route) => {
  const { product } = route.params;
  return [
    {
      id: product.id.toString(),
      animation: "fade",
      resize: "clip",
    },
  ];
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerBtn: { height: 45, width: 120, backgroundColor: tintColorLight },
});

export default ProductScreen;
