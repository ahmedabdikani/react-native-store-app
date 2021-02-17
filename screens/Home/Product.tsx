import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, TextInput } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../../components/button/Button";
import Shadow from "../../components/Shadow";
import SmallList from "../../components/list/ListSmall";
import { CardView, Text, TextSec, View } from "../../components/Theme";
import useThemeColor from "../../hooks/useThemeColor";
import { darkYellow, tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Fonts, Styles } from "../../constants/Styles";
import { useCartContext } from "../../context/CartContext";
import { HomeNavigationProps } from "../../types/Home";
import { Product } from "../../types/Product";
import AnimatedList from "../../components/list/ListAnimated";
import { useProductContext } from "../../context/ProductContext";

const { width, height } = Layout.window;
const padding = 10;
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

Animated.addWhitelistedUIProps({
  text: true,
  value: true,
  defaultValue: true,
});
const AnimatedText = Animated.createAnimatedComponent(TextInput);

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
    const parent = navigation.dangerouslyGetParent();
    parent?.setOptions({
      tabBarVisible: false,
    });
    return () => {
      parent?.setOptions({
        tabBarVisible: true,
      });
    };
  }, [navigation]);

  const SimilarProduts = () => {
    return (
      <CardView style={{ margin: padding, padding, borderRadius: padding }}>
        <CardView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={Fonts.h3}>Furniture Store</Text>
          <Button>
            <Text
              style={{
                color: tintColorLight,
                textDecorationLine: "underline",
                ...Fonts.h4,
              }}
            >
              See more
            </Text>
          </Button>
        </CardView>
        <CardView style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {similarProduts.map(renderSimilarProductItem)}
        </CardView>
      </CardView>
    );
  };

  const renderSimilarProductItem = (item: Product, index: number) => {
    return (
      <Button
        onPress={() => navigation.navigate("Product", { product })}
        key={index}
        style={{ margin: padding }}
      >
        <Image
          source={{ uri: item.images[0] }}
          style={{
            height: 100,
            width: 100,
            resizeMode: "cover",
            borderRadius: padding,
          }}
        />
        <CardView style={{ width: 100 }}>
          <Text numberOfLines={2} style={{ marginVertical: padding * 0.5 }}>
            {item.title}
          </Text>
          <Text style={{ color: tintColorLight, fontSize: 18 }}>
            ${item.price}
          </Text>
        </CardView>
      </Button>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header y={y} top={top} />
      <AnimatedList data={[0]} onScroll={onScroll}>
        {() => {
          return (
            <View>
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
    <CardView style={{ marginTop: padding }}>
      <CardView style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: comment.user.photo }}
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
            borderRadius: 50,
          }}
        />
        <CardView style={{ marginLeft: padding * 0.5 }}>
          <Text style={{ fontWeight: "bold" }}>{comment.user.name}</Text>
          <Text>5 days ago</Text>
        </CardView>
      </CardView>
      <CardView
        style={{ marginVertical: padding * 0.5, marginHorizontal: padding }}
      >
        <TextSec numberOfLines={2} style={{ fontSize: 15 }}>
          {comment.title}
        </TextSec>
      </CardView>
    </CardView>
  );
};

const MoreDetails = ({ product }: { product: Product }) => {
  return (
    <View style={{ paddingHorizontal: padding }}>
      <Text style={{ ...Fonts.body2, paddingVertical: padding }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, in maiores.
        Eligendi magni explicabo, accusantium, nisi deserunt pariatur distinctio
        quia atque esse mollitia voluptatibus ex deleniti quidem! Eum,
        consequuntur excepturi!
      </Text>
      {product?.images.map((image, index) => {
        return (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width: width - padding * 2, height: width }}
          />
        );
      })}
    </View>
  );
};

const CommentList = ({ data }: { data: typeof comments }) => {
  return (
    <CardView
      style={{
        padding: padding,
        borderRadius: padding,
        marginHorizontal: padding,
      }}
    >
      <CardView
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text style={Fonts.h3}>Comments</Text>
        <Button>
          <Text
            style={{
              color: tintColorLight,
              textDecorationLine: "underline",
              ...Fonts.h4,
            }}
          >
            See more
          </Text>
        </Button>
      </CardView>
      <SmallList data={data}>
        {({ item, index }) => <CommentItem comment={item} key={index} />}
      </SmallList>
    </CardView>
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

const Details = ({ product }: { product: Product }) => {
  const backgroundColor = useThemeColor({}, "card");

  return (
    <View style={{ padding }}>
      <View
        style={{
          padding: padding * 2,
          borderRadius: padding,
          backgroundColor,
        }}
      >
        <Text
          style={{
            color: tintColorLight,
          }}
        >
          Price
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            color: tintColorLight,
          }}
        >
          {product?.price}$
        </Text>
        <Text
          style={{
            marginTop: padding / 2,
            fontSize: 16,
            fontWeight: "700",
            letterSpacing: 0.5,
          }}
        >
          {product?.title}
        </Text>
      </View>
    </View>
  );
};

const Carousel = ({ images }: { images: Product["images"] }) => {
  const x = useSharedValue<number>(0);
  const onScroll = useAnimatedScrollHandler({
    onMomentumEnd: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  return (
    <View>
      <AnimatedList data={images} horizontal onScroll={onScroll} pagingEnabled>
        {({ item }) => {
          return <CarouselItem uri={item} />;
        }}
      </AnimatedList>
      <Pagination x={x} total={images.length} />
    </View>
  );
};

const CarouselItem = ({ uri }: { uri: string }) => {
  const style = useAnimatedStyle(() => ({}));

  const navigation = useNavigation();

  return (
    <Button onPress={() => navigation.navigate("ViewContent", { uri })}>
      <Animated.Image
        style={[{ width, height: imageHeight }, style]}
        source={{ uri }}
      />
    </Button>
  );
};

const Footer = ({ product }: { product: Product }) => {
  const { addProductToCart } = useCartContext();
  const textSecondary = useThemeColor({}, "textSecondary");

  return (
    <CardView
      style={{
        flexDirection: "row",
        paddingHorizontal: padding,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <FontAwesome5 name="store" color={tintColorLight} size={20} />
      <FontAwesome5 name="comment-dots" color={textSecondary} size={24} />
      <FontAwesome name="star" color={tintColorLight} size={24} />

      <CardView
        style={{
          flexDirection: "row",
          marginVertical: padding / 2,
        }}
      >
        <Button
          onPress={() => addProductToCart(product)}
          style={{
            ...Styles.centerHV,
            borderBottomLeftRadius: padding * 3,
            borderTopLeftRadius: padding * 3,
            height: 45,
            width: 120,
            backgroundColor: darkYellow,
          }}
        >
          <Text style={{ color: "#fff", ...Fonts.h4 }}>Send to cart</Text>
        </Button>
        <Shadow>
          <Button
            style={{
              ...Styles.centerHV,
              borderBottomRightRadius: padding * 3,
              borderTopRightRadius: padding * 3,
              height: 45,
              width: 120,
              backgroundColor: tintColorLight,
            }}
          >
            <Text style={{ color: "#fff", ...Fonts.h4 }}>Puy item</Text>
          </Button>
        </Shadow>
      </CardView>
    </CardView>
  );
};

interface IPaginationProps {
  x: Animated.SharedValue<number>;
  total: number;
}
const Pagination = ({ x, total }: IPaginationProps) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      defaultValue: Math.round(x.value / width) + 1 + "/ " + 5,
      value: Math.round(x.value / width) + 1 + "/ " + 5,
    };
  });
  return (
    <View
      style={{
        height: 30,
        width: 60,
        position: "absolute",
        bottom: padding,
        right: 0,
        marginRight: padding,
        borderRadius: padding * 2,
        backgroundColor: "#666",
        ...Styles.centerHV,
      }}
    >
      <AnimatedText
        style={{ color: "#fff" }}
        editable={false}
        animatedProps={animatedProps}
      />
    </View>
  );
};

export default ProductScreen;
