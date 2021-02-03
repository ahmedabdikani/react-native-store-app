import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import { FlatList, FlatListProps, Image } from "react-native";
import {
  PanGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  set,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import ProductItem from "../../components/ProductItem";
import {
  CardView,
  Text,
  TextSec,
  useThemeColor,
  View,
} from "../../components/Themed";
import { darkYellow, tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Fonts } from "../../constants/Styles";
import { useCartContext } from "../../Context/CartContext";
import navigation from "../../navigation";
import { HomeStackPramList } from "../../types";

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

const products = Array.from({ length: 6 }, (_, i) => ({
  id: Math.random() * 100000,
  title:
    "officiis magnam consectetur. Quae suscipit sed excepturi ad praesentium odit corrupti voluptates esse quasi consequuntur, minus ipsa.",
  price: Math.floor(Math.random() * 400) + 103,

  image: "https://source.unsplash.com/random/" + i,
}));

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface IProductProps {
  navigation: NavigationProp<HomeStackPramList, "Product">;
  route: RouteProp<HomeStackPramList, "Product">;
}

const Product = ({ navigation, route }: IProductProps) => {
  const { setCartItems } = useCartContext();
  const { product } = route.params;
  const backgroundColor = useThemeColor({}, "card");
  const y = useSharedValue<number>(0);
  const x = useSharedValue<number>(0);
  const [index, setIndex] = useState<number>(1);

  const onScroll = useAnimatedScrollHandler({
    onMomentumEnd: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.y = y.value;
    },
    onActive: ({ translationY, absoluteY }, ctx) => {
      y.value = translationY + ctx.y;
      console.log(y.value);
    },
    onEnd: () => {
      // y.value = withSpring(imageHeight);
    },
  });

  const style = useAnimatedStyle(() => {
    const inputRange = [0, -200];
    return {
      transform: [{ scaleY: withSpring(1) }, { translateX: 0 }], //interpolate(y.value, inputRange, [imageHeight, 1]),
    };
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

  const renderItem = () => {
    const renderCorousel = () => {
      return (
        <AnimatedFlatList
          // style={style}
          horizontal
          scroll={onScroll}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={product?.images}
          renderItem={({ item: image, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("ViewContent", {
                    imageUri: image,
                  })
                }
              >
                <Animated.Image
                  style={[{ width, height: imageHeight }, style]}
                  source={{ uri: image }}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      );
    };

    const renderPagination = () => {
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>{index + "/" + products.length}</Text>
        </View>
      );
    };

    const renderProductInfo = () => {
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

    const renderCommentItem = (item: typeof comments[0], index: number) => {
      return (
        <CardView style={{ marginTop: padding }} key={index}>
          <CardView style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: item.user.photo }}
              style={{
                width: 50,
                height: 50,
                resizeMode: "cover",
                borderRadius: 50,
              }}
            />
            <CardView style={{ marginLeft: padding * 0.5 }}>
              <Text style={{ fontWeight: "bold" }}>{item.user.name}</Text>
              <Text>5 days ago</Text>
            </CardView>
          </CardView>
          <CardView style={{ marginVertical: padding * 0.5 }}>
            <TextSec numberOfLines={2} style={{ fontSize: 15 }}>
              {item.title}
            </TextSec>
          </CardView>
        </CardView>
      );
    };

    const renderCommentSection = () => {
      return (
        <CardView style={{ margin: padding, padding, borderRadius: padding }}>
          <CardView
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Comments</Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: tintColorLight,
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                }}
              >
                See more
              </Text>
            </TouchableOpacity>
          </CardView>
          {comments.map(renderCommentItem)}
        </CardView>
      );
    };

    const renderSimilarItemsSection = () => {
      return (
        <CardView style={{ margin: padding, padding, borderRadius: padding }}>
          <CardView
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Furniture Store
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: tintColorLight,
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                }}
              >
                See more
              </Text>
            </TouchableOpacity>
          </CardView>
          <CardView style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {products.map(renderSimilarProductItem)}
          </CardView>
        </CardView>
      );
    };

    const renderSimilarProductItem = (
      item: typeof products[0],
      index: number
    ) => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("Product", { product })}
          key={index}
          style={{ margin: padding }}
        >
          <Image
            source={{ uri: item.image }}
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
        </TouchableOpacity>
      );
    };

    const renderMoreProductInfo = () => {
      return (
        <View>
          <Text style={{ ...Fonts.body2, paddingVertical: padding }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, in
            maiores. Eligendi magni explicabo, accusantium, nisi deserunt
            pariatur distinctio quia atque esse mollitia voluptatibus ex
            deleniti quidem! Eum, consequuntur excepturi!
          </Text>
          {product?.images.map((image, index) => {
            return (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width, height: width }}
              />
            );
          })}
        </View>
      );
    };

    const renderSimilarProducts = () => {
      return (
        <View style={{ padding }}>
          <Text
            style={{
              ...Fonts.body2,
              color: tintColorLight,
              alignSelf: "center",
            }}
          >
            Similar Items
          </Text>
          <View style={{ flexWrap: "wrap", flexDirection: "row", flex: 1 }}>
            {products.map((product, index) => {
              product.images = [product.image];
              return (
                <View
                  key={index}
                  style={{ paddingVertical: padding, paddingRight: padding }}
                >
                  <ProductItem product={product} />
                </View>
              );
            })}
          </View>
        </View>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <View>
          {renderCorousel()}
          {renderPagination()}
        </View>
        {renderProductInfo()}
        {renderCommentSection()}
        {renderSimilarItemsSection()}
        {renderMoreProductInfo()}
        {/* {renderSimilarProducts()} */}
      </View>
    );
  };

  // React.useCallback( , []);

  const renderFooter = () => {
    return (
      <View
        style={{
          backgroundColor: useThemeColor({}, "card"),
          flexDirection: "row",
          paddingHorizontal: padding,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FontAwesome5 name="store" color={tintColorLight} size={20} />
        <FontAwesome5 name="comment-dots" color={"#777"} size={24} />
        <FontAwesome name="star" color={tintColorLight} size={24} />

        <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
          <TouchableOpacity
            onPress={() => {
              setCartItems((prev) => {
                if (prev.length === 0) {
                  return [{ product, amount: 1 }];
                }
                const productExists = prev.find(
                  (cartItem) => product?.id === cartItem.product.id
                );
                if (productExists) {
                  return prev.map((cartItem) => {
                    if (cartItem.product.id === product?.id) {
                      return { ...cartItem, amount: cartItem.amount + 1 };
                    } else {
                      return cartItem;
                    }
                  });
                } else {
                  return [...prev, { product, amount: 1 }];
                }
              });
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderBottomLeftRadius: padding * 3,
              borderTopLeftRadius: padding * 3,
              height: 50,
              width: 120,
              backgroundColor: darkYellow,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Send to cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderBottomRightRadius: padding * 3,
              borderTopRightRadius: padding * 3,
              height: 50,
              width: 120,
              backgroundColor: tintColorLight,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Puy item</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <PanGestureHandler onGestureEvent={onGestureEvent}> */}
      {/* <Animated.View style={{ flex: 1 }}> */}
      <FlatList
        // onScroll={onScroll}
        data={[1]}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
      {renderFooter()}
      {/* </Animated.View> */}
      {/* </PanGestureHandler> */}
    </View>
  );
};

export default Product;
