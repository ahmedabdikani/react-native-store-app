import * as React from "react";

import Layout from "../constants/Layout";
import { Sizes } from "../constants/Styles";
import { useCartContext } from "../context/CartContext";
import { CartItem } from "../types/Cart";
import Item from "./CartItem";
import FlatList from "./FlatList";

const { height, width } = Layout.window;
const padding = Sizes.base;

interface ICartListProps {
  openMore: boolean;
}

const CartList: React.FC<ICartListProps> = ({ openMore }) => {
  const { cartItems } = useCartContext();
  return (
    <FlatList data={cartItems} contentContainerStyle={{ paddingTop: padding }}>
      {({ item: cartItem }) => <Item cartItem={cartItem} openMore={openMore} />}
    </FlatList>
  );
};

export default CartList;
