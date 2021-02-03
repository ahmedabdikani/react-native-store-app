import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import {
  useThemeColor,
  View,
  Text,
  CardView,
  TextSec,
} from "../../components/Themed";
import { tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import {
  cartItem,
  CartNavigationProp,
  CartRouteProp,
} from "../../Types/ShoppingCart";
import { useCartContext } from "../../Context/CartContext";
import { Fonts } from "../../constants/Styles";
import { product } from "../../Types/Product";
import { FontAwesome } from "@expo/vector-icons";

const padding = 10;
const { height, width } = Layout.window;
interface IShoppingCartProps
  extends CartNavigationProp<"Chat">,
    CartRouteProp<"Chat"> {}

const getImages = (index: number): string[] => {
  return Array.from(
    { length: 5 },
    (_, i) => "https://source.unsplash.com/random/" + (i + 1) * index
  );
};

const products = Array.from({ length: 10 }, (_, i) => ({
  id: Math.random() * 100000,
  title:
    "officiis magnam consectetur. Quae suscipit sed excepturi ad praesentium odit corrupti voluptates esse quasi consequuntur, minus ipsa.",
  price: Math.floor(Math.random() * 400) + 103,

  images: getImages(i + 1),
}));

const ShoppingCart = ({ navigation, route }: IShoppingCartProps) => {
  const { top } = useSafeAreaInsets();
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "card");
  const tabBarheight = useBottomTabBarHeight();
  const [openMore, setOpenMore] = React.useState(false);
  const { cartItems, setCartItems } = useCartContext();

  const total = cartItems.reduce(
    (acc, cartItem) => parseInt(cartItem.product.price) * cartItem.amount + acc,
    0
  );

  // const disabled = amountValue === 1 ? true : false;

  const renderItem = ({ item: cartItem }: { item: cartItem }) => {
    return (
      <CardView
        style={{
          marginBottom: padding,
          borderRadius: padding,
          padding,
        }}
      >
        <CardView style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginBottom: padding,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Furniture Store
          </Text>
        </CardView>
        <CardView style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: cartItem.product.images[0] }}
            style={{
              height: 90,
              width: 90,
              resizeMode: "cover",
              marginBottom: padding,
            }}
          />
          <CardView
            style={{
              flex: 1,
              marginLeft: padding,
              justifyContent: "space-between",
            }}
          >
            <Text numberOfLines={2}>{cartItem.product.title}</Text>
            <CardView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: padding * 4,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: tintColorLight,
                  fontSize: 18,
                }}
              >
                ${cartItem.product.price}
              </Text>

              {openMore ? deleteCartItem(cartItem) : amount(cartItem)}
            </CardView>
          </CardView>
        </CardView>
      </CardView>
    );
  };

  const deleteCartItem = (cartItem: cartItem) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCartItems((prev) => {
            return prev.filter(
              (prevCartItem) => prevCartItem.product.id !== cartItem.product.id
            );
          });
        }}
      >
        <FontAwesome name="trash-o" size={24} color={textColor} />
      </TouchableOpacity>
    );
  };

  const amount = (cartItem: cartItem) => {
    const disabled = cartItem.amount <= 1;
    return (
      <CardView
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: textColor,
          borderRadius: padding,
          borderWidth: 1,
        }}
      >
        <TouchableOpacity
          disabled={disabled}
          onPress={() =>
            setCartItems((prev) => {
              return prev.map((prevCartItem) => {
                if (cartItem.product.id === prevCartItem.product.id) {
                  if (prevCartItem.amount <= 1) {
                    return prevCartItem;
                  }
                  return { ...prevCartItem, amount: prevCartItem.amount - 1 };
                } else {
                  return prevCartItem;
                }
              });
            })
          }
          style={{
            paddingHorizontal: padding * 0.5,
            borderColor: textColor,
            borderRightWidth: 1,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>-</Text>
        </TouchableOpacity>
        <CardView style={{ paddingHorizontal: padding }}>
          <Text style={{ fontSize: 16 }}>{cartItem.amount}</Text>
        </CardView>
        <TouchableOpacity
          onPress={() =>
            setCartItems((prev) => {
              return prev.map((prevCartItem) => {
                if (cartItem.product.id === prevCartItem.product.id) {
                  if (prevCartItem.amount >= 100) {
                    return prevCartItem;
                  }
                  return { ...prevCartItem, amount: prevCartItem.amount + 1 };
                } else {
                  return prevCartItem;
                }
              });
            })
          }
          style={{
            borderColor: textColor,
            paddingHorizontal: padding * 0.5,
            borderLeftWidth: 1,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>+</Text>
        </TouchableOpacity>
      </CardView>
    );
  };

  const header = () => {
    return (
      <CardView
        style={{
          marginHorizontal: -padding,
          marginTop: -padding,
          padding,
        }}
      >
        <CardView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: padding,
          }}
        >
          <Text style={{ ...Fonts.h2 }}>Shopping Cart</Text>
          <TouchableOpacity onPress={() => setOpenMore((prev) => !prev)}>
            <TextSec style={Fonts.body3}>{openMore ? "Hide" : "More"}</TextSec>
          </TouchableOpacity>
        </CardView>
        <CardView>
          <Text> {cartItems.length} Items</Text>
        </CardView>
      </CardView>
    );
  };
  const footer = () => {
    return (
      <View
        style={{
          margin: -padding,
          marginTop: 0,
          padding,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor,
          borderBottomColor: useThemeColor({}, "background"),
          borderBottomWidth: 2,
        }}
      >
        <Text>Sellect all</Text>
        <View
          style={{
            backgroundColor: "transparent",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text>Total ${total}</Text>
          <TouchableOpacity
            style={{
              marginLeft: padding,
              backgroundColor: tintColorLight,
              alignItems: "center",
              borderRadius: padding * 3,
              paddingHorizontal: padding * 2,
              paddingVertical: padding,
            }}
          >
            <Text style={{ color: "#fff" }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CardView style={{ height: top, width }} />

      <View style={[styles.container]}>
        {header()}
        <FlatList
          // ListHeaderComponent={header}
          ListEmptyComponent={() => listEmptyComponent(textColor)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: padding }}
          data={cartItems}
          renderItem={renderItem}
          bounces={false}
          keyExtractor={(_, index) => index.toString()}
        />
        {footer()}
      </View>
    </View>
  );
};

const listEmptyComponent = (textColor: string) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // flexDirection: "row",
      marginTop: height / 3,
    }}
  >
    <TextSec style={{ ...Fonts.body2, marginBottom: padding }}>
      Shopping cart is empty
    </TextSec>
    <FontAwesome name="shopping-cart" size={20} color={textColor} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: padding,
  },
});

export default ShoppingCart;
