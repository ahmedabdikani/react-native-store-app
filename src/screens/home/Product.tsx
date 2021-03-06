import React, { useEffect } from "react";
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
import { SharedElement } from "react-navigation-shared-element";

import Button from "../../components/button/Button";
import { View } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { darkYellow, tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Sizes, Styles } from "../../constants/Styles";
import { useCartContext } from "../../context/cart/CartContext";
import { HomeScreenProps } from "../../types/navigation";
import { Product } from "../../types/Product";
import AnimatedList from "../../components/list/ListAnimated";
import { useProductContext } from "../../context/product";
import {
  Body2,
  ButtonText,
  Caption,
  Subtitle1,
  Subtitle2,
} from "../../components/typography";

import Center from "../../components/center/Center";
import Carousel from "../../components/product/Carousel";
import { Details, MoreDetails } from "../../components/product/Details";
import useHideBottomBar from "../../hooks/useHideBottomBar";
import CommentList from "../../components/comment/CommentList";
import { useLanguage } from "../../context/language/LanguageContex";
import Shadow from "../../components/shadow/Shadow";
import { useFavorateContext } from "../../context/favorites";
import { CommonActions, StackActions } from "@react-navigation/native";

const { width, height } = Layout.window;
const { spacing } = Sizes;
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

interface ProductProps extends HomeScreenProps<"Product"> {}

const ProductScreen = ({ navigation, route }: ProductProps) => {
  const { products } = useProductContext();
  const { product } = route.params;
  const { createFavorate, favorites } = useFavorateContext();

  const similarProduts = Array.from(
    { length: Math.min(products.length, 6) },
    (_, index) => products[index]
  );
  const y = useSharedValue(0);
  const { top } = useSafeAreaInsets();

  // const action = CommonActions.("ProfileStack", {
  //   name: "ProfileStack",
  //   key: Math.floor(Math.random() * 100000).toString(),
  //   params: { screen: "Store" },
  // });

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      y.value = contentOffset.y;
    },
  });

  const liked = favorites.some((favorite) => favorite.id === product.id);

  const onLike = () => {
    createFavorate(product.id);
  };

  // const state = route.

  useEffect(() => {
    const unSubscripe = useHideBottomBar(navigation.dangerouslyGetParent());
    return () => {
      unSubscripe && unSubscripe();
    };
  }, [navigation]);

  console.log();

  const SimilarProduts = () => {
    return (
      <View
        card
        style={{
          margin: spacing.s,
          padding: spacing.s,
          borderRadius: spacing.s,
        }}
      >
        <View row card style={{ justifyContent: "space-between" }}>
          <Subtitle1>Furniture Store</Subtitle1>
          <Button
            onPress={() => {
              // navigation.dispatch(action)
              // navigation
            }}
          >
            <Subtitle2 underline primary>
              See more
            </Subtitle2>
          </Button>
        </View>
        <View
          card
          row
          style={{
            marginHorizontal: spacing.s,
            // justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {similarProduts.map(renderSimilarProductItem)}
        </View>
      </View>
    );
  };

  const renderSimilarProductItem = (item: Product, index: number) => {
    return (
      <Button
        onPress={() => navigation.navigate("Product", { product })}
        key={index}
        style={{ margin: spacing.s }}
      >
        <Image
          source={{ uri: item.images[0] }}
          style={{
            height: 100,
            width: 100,
            resizeMode: "cover",
            borderRadius: spacing.s,
          }}
        />
        <View card style={{ width: 100 }}>
          <Caption numberOfLines={2} style={{ marginVertical: spacing.s / 2 }}>
            {item.title}
          </Caption>
          <Body2 primary>${item.price}</Body2>
        </View>
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
              <CommentList comments={comments} navigation={navigation} />
              {SimilarProduts()}
              <MoreDetails product={product} />
            </View>
          );
        }}
      </AnimatedList>
      <Footer product={product} onLike={onLike} liked={liked} />
    </View>
  );
};

interface HeaderProps {
  top: number;
  y: Animated.SharedValue<number>;
}

const Header = ({ y, top }: HeaderProps) => {
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
      zIndex: 20,
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
    <Shadow>
      <Animated.View style={[Styles.centerH, containerStyle]}>
        <Animated.Text style={textStyle}>Go to top</Animated.Text>
      </Animated.View>
    </Shadow>
  );
};

const Footer = ({
  product,
  onLike,
  liked,
}: {
  liked: boolean;
  product: Product;
  onLike: () => void;
}) => {
  const { addProductToCart } = useCartContext();
  const { language } = useLanguage();
  const textSecondary = useThemeColor({}, "textSecondary");
  const color = "#fff";
  return (
    <View card style={styles.footerContainer}>
      <FontAwesome5 name="store" color={tintColorLight} size={20} />
      <FontAwesome5 name="comment-dots" color={textSecondary} size={24} />
      {!liked ? (
        <Button onPress={onLike}>
          <FontAwesome name="star" color={textSecondary} size={24} />
        </Button>
      ) : (
        <Button onPress={() => {}}>
          <FontAwesome name="star" color={tintColorLight} size={24} />
        </Button>
      )}
      <View
        card
        row
        style={{
          marginVertical: spacing.s,
        }}
      >
        <Button
          onPress={() => addProductToCart(product)}
          style={[
            styles.footerBtn,
            {
              borderBottomLeftRadius: spacing.l,
              borderTopLeftRadius: spacing.l,
              backgroundColor: darkYellow,
            },
          ]}
        >
          <Center>
            <ButtonText style={{ color }}>
              <FontAwesome name="shopping-cart" size={24} color={"#fff"} />
            </ButtonText>
          </Center>
        </Button>
        <Button
          style={[
            styles.footerBtn,

            {
              borderBottomRightRadius: spacing.l,
              borderTopRightRadius: spacing.l,
            },
          ]}
        >
          <Center>
            <ButtonText style={{ color }}>{language.puyItem}</ButtonText>
          </Center>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing.s,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerBtn: { height: 45, width: 120, backgroundColor: tintColorLight },
});

export default ProductScreen;
