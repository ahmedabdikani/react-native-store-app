import * as React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Image } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../../components/button/Button";
import SmallList from "../../components/list/ListSmall";
import { Card, Text, TextSec, View } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { darkYellow, tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Sizes, Styles } from "../../constants/Styles";
import { useCartContext } from "../../context/CartContext";
import { HomeNavigationProps } from "../../types/Home";
import { Product } from "../../types/Product";
import AnimatedList from "../../components/list/ListAnimated";
import { useProductContext } from "../../context/ProductContext";
import Body2 from "../../components/typography/Body2";
import H3 from "../../components/typography/H3";
import H4 from "../../components/typography/H4";
import TextTintColored from "../../components/typography/TextPrimary";
import TextUnderline from "../../components/theme/TextUnderline";
import Center from "../../components/theme/Center";
import Carousel from "../../components/product/Carousel";
import { Details, MoreDetails } from "../../components/product/Details";
import useHideBottomBar from "../../hooks/useHideBottomBar";

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

interface IProductProps extends HomeNavigationProps<"Product"> {}

const ProductScreen = ({ navigation, route }: IProductProps) => {
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
          <H3>Furniture Store</H3>
          <Button>
            <Button>
              <H4>
                <TextUnderline>
                  <TextTintColored>See more</TextTintColored>
                </TextUnderline>
              </H4>
            </Button>
          </Button>
        </Card>
        <Card style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
          <Body2 numberOfLines={2} style={{ marginVertical: spacing * 0.5 }}>
            {item.title}
          </Body2>
          <Body2>
            <TextTintColored>${item.price}</TextTintColored>
          </Body2>
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
              <Carousel images={product.images} />
              <Details product={product} />
              <CommentList data={comments} />
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

const CommentItem = ({ comment }: { comment: typeof comments[number] }) => {
  return (
    <Card style={{ marginTop: spacing }}>
      <Card style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: comment.user.photo }}
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
            borderRadius: 50,
          }}
        />
        <Card style={{ marginLeft: spacing * 0.5 }}>
          <Text style={{ fontWeight: "bold" }}>{comment.user.name}</Text>
          <Text>5 days ago</Text>
        </Card>
      </Card>
      <Card
        style={{ marginVertical: spacing * 0.5, marginHorizontal: spacing }}
      >
        <TextSec numberOfLines={2} style={{ fontSize: 15 }}>
          {comment.title}
        </TextSec>
      </Card>
    </Card>
  );
};

const CommentList = ({ data }: { data: typeof comments }) => {
  return (
    <Card
      style={{
        padding: spacing,
        borderRadius: spacing,
        marginHorizontal: spacing,
      }}
    >
      <Card style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <H3>Comments</H3>
        <Button>
          <H4>
            <TextUnderline>
              <TextTintColored>See more</TextTintColored>
            </TextUnderline>
          </H4>
        </Button>
      </Card>
      <SmallList data={data}>
        {({ item, index }) => <CommentItem comment={item} key={index} />}
      </SmallList>
    </Card>
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

  return (
    <Card
      style={{
        flexDirection: "row",
        paddingHorizontal: spacing,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
          style={{
            borderBottomLeftRadius: spacing * 3,
            borderTopLeftRadius: spacing * 3,
            height: 45,
            width: 120,
            backgroundColor: darkYellow,
          }}
        >
          <Center>
            <H4 style={{ color: "#fff" }}>Send to cart</H4>
          </Center>
        </Button>
        <Button
          style={{
            borderBottomRightRadius: spacing * 3,
            borderTopRightRadius: spacing * 3,
            height: 45,
            width: 120,
            backgroundColor: tintColorLight,
          }}
        >
          <Center>
            <H4 style={{ color: "#fff" }}>Puy item</H4>
          </Center>
        </Button>
      </Card>
    </Card>
  );
};

export default ProductScreen;
