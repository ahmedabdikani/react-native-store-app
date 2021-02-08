import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Button from "../../components/Button";

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
  const backgroundColor = useThemeColor({}, "card");
  const y = useSharedValue<number>(0);
  const [index, setIndex] = useState<number>(1);

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
    const Pagination = () => {
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
          <Text style={{ color: "#fff" }}>
            {index + "/" + product.images.length}
          </Text>
        </View>
      );
    };

    const Details = () => {
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

    const CommentItem = (item: typeof comments[0], index: number) => {
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
          <CardView
            style={{ marginVertical: padding * 0.5, marginHorizontal: padding }}
          >
            <TextSec numberOfLines={2} style={{ fontSize: 15 }}>
              {item.title}
            </TextSec>
          </CardView>
        </CardView>
      );
    };

    const ProductComments = () => {
      const children = CommentItem;
      return (
        <RenderList
          style={{
            padding: padding,
            borderRadius: padding,
            backgroundColor,
            marginHorizontal: padding,
          }}
          data={comments}
        >
          {children}
        </RenderList>
      );
    };

    // const renderCommentSection = () => {
    //   return (
    //     <CardView style={{ margin: padding, padding, borderRadius: padding }}>
    //       <CardView
    //         style={{ flexDirection: "row", justifyContent: "space-between" }}
    //       >
    //         <Text style={{ fontSize: 15, fontWeight: "bold" }}>Comments</Text>
    //         <Button>
    //           <Text
    //             style={{
    //               color: tintColorLight,
    //               textDecorationLine: "underline",
    //               fontWeight: "bold",
    //             }}
    //           >
    //             See more
    //           </Text>
    //         </Button>
    //       </CardView>
    //       {comments.map(renderCommentItem)}
    //     </CardView>
    //   );
    // };

    const renderSimilarItemsSection = () => {
      return (
        <CardView style={{ margin: padding, padding, borderRadius: padding }}>
          <CardView
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Furniture Store
            </Text>
            <Button>
              <Text
                style={{
                  color: tintColorLight,
                  textDecorationLine: "underline",
                  fontWeight: "bold",
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
        </Button>
      );
    };

    const MoreDetails = () => {
      return (
        <View style={{ paddingHorizontal: padding }}>
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
                style={{ width: width - padding * 2, height: width }}
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
            {[].map((product, index) => {
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
          <Carousel images={product.images} />
          {Pagination()}
        </View>
        {Details()}
        {/* {renderCommentSection()} */}
        <ProductComments />
        {/* {renderSimilarItemsSection()} */}
        {MoreDetails()}
        {/* {renderSimilarProducts()} */}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <PanGestureHandler onGestureEvent={onGestureEvent}> */}
      {/* <Animated.View style={{ flex: 1 }}> */}
      <FlatList
        data={[1]}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
      <Footer product={product} />
      {/* </Animated.View> */}
      {/* </PanGestureHandler> */}
    </View>
  );
};

interface IRenderListProps<T> {
  data: T[];
  style?: StyleProp<ViewStyle>;
}

const RenderList = ({
  children,
  data,
  style,
}: React.PropsWithChildren<IRenderListProps<T>>) => {
  return (
    <View style={style}>
      {data.map((item, index) => children(item, index))}
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

  const renderCarouselItem: ListRenderItem<Product["images"][0]> = ({
    item,
    index,
  }) => {
    return <CarouselItem uri={item} x={x} />;
  };

  return (
    <AnimatedFlatList
      horizontal
      scroll={onScroll}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data={images}
      renderItem={renderCarouselItem}
      keyExtractor={(_, index: number) => index.toString()}
    />
  );
};

const CarouselItem = ({
  uri,
  x,
}: {
  uri: string;
  x: Animated.SharedValue<number>;
}) => {
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
  const backgroundColor = useThemeColor({}, "card");
  const textSecondary = useThemeColor({}, "textSecondary");

  return (
    <View
      style={{
        backgroundColor,
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
        </Button>

        <Button
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
        </Button>
      </CardView>
    </View>
  );
};

export default ProductScreen;
