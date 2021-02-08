import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { FlatList, ListRenderItem } from "react-native";

import Layout from "../constants/Layout";
import { Fonts, Sizes } from "../constants/Styles";
import {
  AddProductToCartType,
  RemoveProductFromCartType,
  useCartContext,
} from "../context/CartContext";
import { CartItem } from "../types/Cart";
import Item from "./CartItem";
import { TextSec, useThemeColor, View } from "./Themed";

const { height, width } = Layout.window;
const padding = Sizes.base;

interface ICartListProps {
  cartItems: CartItem[];
  openMore: boolean;
}

const CartList: React.FC<ICartListProps> = ({ cartItems, openMore }) => {
  const color = useThemeColor({}, "text");
  const {
    deleteProductFromCart,
    removeProductFromCart,
    addProductToCart,
  } = useCartContext();
  const renderCartItem: ListRenderItem<CartItem> = ({ item: cartItem }) => {
    return (
      <Item
        cartItem={cartItem}
        openMore={openMore}
        addProductToCart={addProductToCart}
        removeProductFromCart={removeProductFromCart}
        deleteProductFromCart={deleteProductFromCart}
      />
    );
  };

  return (
    <FlatList
      ListEmptyComponent={<ListEmptyComponent textColor={color} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: padding }}
      data={cartItems}
      renderItem={renderCartItem}
      bounces={false}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const ListEmptyComponent = ({ textColor }: { textColor: string }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: height / 3,
    }}
  >
    <TextSec style={{ ...Fonts.body2, marginBottom: padding }}>
      Shopping cart is empty
    </TextSec>
    <FontAwesome name="shopping-cart" size={20} color={textColor} />
  </View>
);

export default CartList;
