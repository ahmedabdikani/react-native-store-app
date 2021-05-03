import React from "react";

import { Sizes } from "../../constants/Styles";
import { useCartContext } from "../../context/cart/CartContext";
import Item from "./CartItem";
import FlatList from "../list/ListFlat";

const padding = Sizes.spacing.s;

interface CartListProps {
  openMore: boolean;
}

const CartList: React.FC<CartListProps> = ({ openMore }) => {
  const { cartItems } = useCartContext();
  return (
    <FlatList
      dependencies={[openMore]}
      data={cartItems}
      contentContainerStyle={{ paddingTop: padding }}
    >
      {({ item: cartItem, index }) => {
        console.log("i run ", index);
        return <Item cartItem={cartItem} openMore={openMore} />;
      }}
    </FlatList>
  );
};

export default CartList;
