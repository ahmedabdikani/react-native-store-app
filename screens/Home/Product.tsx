import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FlatList, ListRenderItem, Image } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../components/Button";

import ProductItem from "../../components/ProductItem";
import SmallList from "../../components/SmallList";
import {
  CardView,
  Text,
  TextSec,
  useThemeColor,
  View,
} from "../../components/Themed";
import { darkYellow, tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Fonts, Styles } from "../../constants/Styles";
import { useCartContext } from "../../context/CartContext";
import { HomeNavigationProp } from "../../types/Home";
import {
  Product,
  ProductNavigationProp,
  ProductRouteProp,
} from "../../types/Product";

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

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface IProductProps
  extends ProductNavigationProp<"Product">,
    ProductRouteProp<"Product"> {}

const ProductScreen = ({ navigation, route }: IProductProps) => {
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
          {/* {products.map(renderSimilarProductItem)} */}
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
      <AnimatedFlatList
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => index.toString()}
        data={[0]}
        renderItem={React.useCallback(() => {
          return (
            <View>
              <Carousel images={product.images} />
              <Details product={product} />
              <CommentList data={comments} />
              <MoreDetails product={product} />
            </View>
          );
        }, [])}
      />
      <Footer product={product} />
    </View>
  );
};
const CommentItem = ({ comment }: { comment: typeof comments[0] }) => {
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
  const backgroundColor = useThemeColor({}, "card");

  return (
    <SmallList
      style={{
        padding: padding,
        borderRadius: padding,
        backgroundColor,
        marginHorizontal: padding,
      }}
      data={data}
    >
      {(comment, index) => {
        return <CommentItem comment={comment} key={index} />;
      }}
    </SmallList>
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
  const x = useSharedValue<number>(width);
  const onScroll = useAnimatedScrollHandler({
    onMomentumEnd: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  const renderCarouselItem: ListRenderItem<Product["images"][0]> = ({
    item,
    index,
  }) => {
    return <CarouselItem uri={item} />;
  };

  return (
    <View>
      <AnimatedFlatList
        horizontal
        scroll={onScroll}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={renderCarouselItem}
        keyExtractor={(_, index: number) => index.toString()}
      />
      <Pagination
        currentIndex={Math.round(x.value / width)}
        total={images.length}
      />
    </View>
  );
};

const CarouselItem = ({ uri }: { uri: string }) => {
  const style = useAnimatedStyle(() => ({}));

  const navigation = useNavigation<
    HomeNavigationProp<"ViewContent">["navigation"]
  >();

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

      <CardView style={{ flexDirection: "row" }}>
        <Button
          onPress={() => addProductToCart(product)}
          style={{
            ...Styles.centerHV,
            borderBottomLeftRadius: padding * 3,
            borderTopLeftRadius: padding * 3,
            height: 50,
            width: 120,
            backgroundColor: darkYellow,
          }}
        >
          <Text style={{ color: "#fff", ...Fonts.h4 }}>Send to cart</Text>
        </Button>

        <Button
          style={{
            ...Styles.centerHV,
            borderBottomRightRadius: padding * 3,
            borderTopRightRadius: padding * 3,
            height: 50,
            width: 120,
            backgroundColor: tintColorLight,
          }}
        >
          <Text style={{ color: "#fff", ...Fonts.h4 }}>Puy item</Text>
        </Button>
      </CardView>
    </CardView>
  );
};

interface IPaginationProps {
  currentIndex: number;
  total: number;
}
const Pagination = ({ currentIndex, total }: IPaginationProps) => {
  return (
    <View
      style={{
        height: 30,
        width: 50,
        position: "absolute",
        bottom: padding,
        right: 0,
        marginRight: padding,
        borderRadius: padding * 2,
        backgroundColor: "#666",
        ...Styles.centerHV,
      }}
    >
      <Text style={{ color: "#fff" }}>{currentIndex + "/" + total}</Text>
    </View>
  );
};

export default ProductScreen;
