import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Image } from "react-native";

import { tintColorLight } from "../constants/Colors";
import { Sizes } from "../constants/Styles";
import {
  AddProductToCartType,
  RemoveProductFromCartType,
} from "../Context/CartContext";
import { CartItem as ItemType } from "../Types/Cart";
import Button from "./Button";
import { CardView, Text, useThemeColor } from "./Themed";

const padding = Sizes.base;

interface ICartItemProps {
  cartItem: ItemType;
  openMore: boolean;
  addProductToCart: AddProductToCartType;
  removeProductFromCart: RemoveProductFromCartType;
  deleteProductFromCart: RemoveProductFromCartType;
}

const CartItem: React.FC<ICartItemProps> = ({
  cartItem,
  openMore,
  addProductToCart,
  removeProductFromCart,
  deleteProductFromCart,
}) => {
  const color = useThemeColor({}, "text");
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

            {openMore ? (
              <Trash
                id={cartItem.product.id}
                textColor={color}
                deleteProductFromCart={deleteProductFromCart}
              />
            ) : (
              <Amount
                cartItem={cartItem}
                addProductToCart={addProductToCart}
                removeProductFromCart={removeProductFromCart}
                textColor={color}
              />
            )}
          </CardView>
        </CardView>
      </CardView>
    </CardView>
  );
};

interface ITrashProp {
  id: ItemType["product"]["id"];
  deleteProductFromCart: RemoveProductFromCartType;
  textColor: string;
}

const Trash = ({ id, deleteProductFromCart, textColor }: ITrashProp) => {
  return (
    <Button
      onPress={() => {
        deleteProductFromCart(id);
      }}
    >
      <FontAwesome name="trash-o" size={24} color={textColor} />
    </Button>
  );
};

interface IAmountProp {
  textColor: string;
  cartItem: ItemType;
  removeProductFromCart: RemoveProductFromCartType;
  addProductToCart: AddProductToCartType;
}

const Amount = ({
  cartItem,
  addProductToCart,
  removeProductFromCart,
  textColor,
}: IAmountProp) => {
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
      <Button
        disabled={disabled}
        onPress={() => removeProductFromCart(cartItem.product.id)}
        style={{
          paddingHorizontal: padding * 0.5,
          borderColor: textColor,
          borderRightWidth: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>-</Text>
      </Button>
      <CardView style={{ paddingHorizontal: padding }}>
        <Text style={{ fontSize: 16 }}>{cartItem.amount}</Text>
      </CardView>
      <Button
        onPress={() => addProductToCart(cartItem.product)}
        style={{
          borderColor: textColor,
          paddingHorizontal: padding * 0.5,
          borderLeftWidth: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>+</Text>
      </Button>
    </CardView>
  );
};

export default CartItem;
