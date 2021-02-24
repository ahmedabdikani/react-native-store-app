import * as React from "react";

import { Sizes } from "../../constants/Styles";
import { useCartContext } from "../../context/CartContext";
import Item from "./CartItem";
import FlatList from "../list/ListFlat";

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
