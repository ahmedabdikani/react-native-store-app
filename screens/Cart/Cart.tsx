import * as React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View, Text, CardView, TextSec } from "../../components/Theme";
import { tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { CartNavigationProp, CartRouteProp } from "../../types/Cart";
import { useCartContext } from "../../context/CartContext";
import { Fonts } from "../../constants/Styles";
import CartList from "../../components/cart/CartList";
import useThemeColor from "../../hooks/useThemeColor";
import { StyleSheet } from "react-native";
import Button from "../../components/button/Button";

const padding = 10;
const { width } = Layout.window;

interface ICartProps
  extends CartNavigationProp<"Cart">,
    CartRouteProp<"Cart"> {}

const Cart: React.FC<ICartProps> = ({ navigation, route }) => {
  const { top } = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "card");
  const [openMore, setOpenMore] = React.useState(false);
  const { cartItems, total } = useCartContext();

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
          <Button onPress={() => setOpenMore((prev) => !prev)}>
            <TextSec style={Fonts.body3}>{openMore ? "Hide" : "More"}</TextSec>
          </Button>
        </CardView>
        <CardView>
          <Text> Items {cartItems.length}</Text>
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
          <Button
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
          </Button>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CardView style={{ height: top, width }} />
      <View style={styles.container}>
        {header()}
        <CartList openMore={openMore} />
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
