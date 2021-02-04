import * as React from "react";
import { Image, ListRenderItem, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
import { CartItem, CartNavigationProp, CartRouteProp } from "../../Types/Cart";
import { useCartContext } from "../../Context/CartContext";
import { Fonts } from "../../constants/Styles";
import { Product } from "../../Types/Product";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../../components/Button";
import CartList from "../../components/CartList";

const padding = 10;
const { height, width } = Layout.window;

interface ICartProps
  extends CartNavigationProp<"Cart">,
    CartRouteProp<"Cart"> {}

const Cart: React.FC<ICartProps> = ({ navigation, route }) => {
  const { top } = useSafeAreaInsets();
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "card");
  const tabBarheight = useBottomTabBarHeight();
  const [openMore, setOpenMore] = React.useState(false);
  const {
    cartItems,
    total,
    addProductToCart,
    deleteProductFromCart,
    removeProductFromCart,
  } = useCartContext();

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
          <Text> {cartItems?.length} Items</Text>
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
      <View style={styles.container}>
        {header()}
        <CartList
          cartItems={cartItems}
          addProductToCart={addProductToCart}
          removeProductFromCart={removeProductFromCart}
          deleteProductFromCart={deleteProductFromCart}
          openMore={openMore}
        />
        {footer()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: padding,
  },
});

export default Cart;
