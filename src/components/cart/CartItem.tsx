import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Image } from "react-native";

import { Sizes } from "../../constants/Styles";
import { useCartContext } from "../../context/CartContext";
import { CartItem as ItemType } from "../../types/Cart";
import Button from "../button/Button";
import { Card, Text } from "../theme";
import useThemeColor from "../../hooks/useThemeColor";
import { Body1, H3, H4 } from "../typography";

const padding = Sizes.base;

interface ICartItemProps {
  cartItem: ItemType;
  openMore: boolean;
}

const CartItem: React.FC<ICartItemProps> = ({ cartItem, openMore }) => {
  return (
    <Card
      style={{
        marginBottom: padding,
        borderRadius: padding,
        padding,
      }}
    >
      <Card style={{ flexDirection: "row" }}>
        <H3>Furniture Store</H3>
      </Card>
      <Card style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: cartItem.product.images[0] }}
          style={{
            height: 90,
            width: 90,
            resizeMode: "cover",
            marginLeft: padding,
            marginBottom: padding,
          }}
        />
        <Card
          style={{
            flex: 1,
            marginLeft: padding,
            justifyContent: "space-between",
          }}
        >
          <Text numberOfLines={2}>{cartItem.product.title}</Text>
          <Card
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: padding * 4,
            }}
          >
            <Body1 primary>${cartItem.product.price}</Body1>

            {openMore ? (
              <Trash id={cartItem.product.id} />
            ) : (
              <Amount cartItem={cartItem} />
            )}
          </Card>
        </Card>
      </Card>
    </Card>
  );
};

interface ITrashProp {
  id: ItemType["product"]["id"];
}

const Trash = ({ id }: ITrashProp) => {
  const color = useThemeColor({}, "text");
  const { deleteProductFromCart } = useCartContext();
  return (
    <Button
      onPress={() => {
        deleteProductFromCart(id);
      }}
    >
      <FontAwesome name="trash-o" size={24} color={color} />
    </Button>
  );
};

interface IAmountProp {
  cartItem: ItemType;
}

const Amount = ({ cartItem }: IAmountProp) => {
  const { removeProductFromCart, addProductToCart } = useCartContext();
  const color = useThemeColor({}, "text");
  const disabled = cartItem.amount <= 1;

  return (
    <Card
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderColor: color,
        borderRadius: padding,
        borderWidth: 1,
      }}
    >
      <Button
        disabled={disabled}
        onPress={() => removeProductFromCart(cartItem.product.id)}
        style={{
          paddingHorizontal: padding * 0.5,
          borderColor: color,
          borderRightWidth: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>-</Text>
      </Button>
      <Card style={{ paddingHorizontal: padding }}>
        <Text style={{ fontSize: 16 }}>{cartItem.amount}</Text>
      </Card>
      <Button
        onPress={() => addProductToCart(cartItem.product)}
        style={{
          borderColor: color,
          paddingHorizontal: padding * 0.5,
          borderLeftWidth: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>+</Text>
      </Button>
    </Card>
  );
};

export default CartItem;
