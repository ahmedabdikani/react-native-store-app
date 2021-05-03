import React from "react";
import { Image, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Sizes } from "../../constants/Styles";
import { useCartContext } from "../../context/cart/CartContext";
import { CartItem as ItemType } from "../../types/Cart";
import Button from "../button/Button";
import { View } from "../theme";
import useThemeColor from "../../hooks/useThemeColor";
import { Body1, Body2, Subtitle1 } from "../typography";
import SelectionToggleIcon from "./SelectionToggleIcon";

const padding = Sizes.spacing.s;
const imageHeight = 90;

interface CartItemProps {
  cartItem: ItemType;
  openMore: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem, openMore }) => {
  const { toggleProductSelection } = useCartContext();
  return (
    <View card style={styles.container}>
      <View card row style={{}}>
        <Button onPress={() => toggleProductSelection(cartItem.product.id)}>
          <SelectionToggleIcon condition={cartItem.selected} />
        </Button>
        <Subtitle1 style={{ marginBottom: padding, marginLeft: padding }}>
          Furniture Store
        </Subtitle1>
      </View>
      <View card row>
        {/* <FontAwesome name={"circle-o"} size={18} /> */}
        <Image
          source={{ uri: cartItem.product.images[0] }}
          style={styles.img}
        />
        <View
          card
          style={{
            flex: 1,
            marginLeft: padding,
            justifyContent: "space-between",
          }}
        >
          <Body2 numberOfLines={2}>{cartItem.product.title}</Body2>
          <View
            card
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Body1 primary>${cartItem.product.price}</Body1>

            {openMore ? (
              <Trash id={cartItem.product.id} />
            ) : (
              <Amount cartItem={cartItem} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

interface TrashProps {
  id: ItemType["product"]["id"];
}

const Trash = ({ id }: TrashProps) => {
  const color = useThemeColor({}, "text");
  const { deleteProductFromCart } = useCartContext();
  return (
    <Button
      onPress={() => {
        deleteProductFromCart(id);
      }}
    >
      <FontAwesome5 name="trash-alt" size={20} color={color} />
    </Button>
  );
};

interface AmountProps {
  cartItem: ItemType;
}

const Amount = ({ cartItem }: AmountProps) => {
  const { removeProductFromCart, addProductToCart } = useCartContext();
  const borderColor = useThemeColor({}, "text");
  const disabled = cartItem.amount <= 1;

  return (
    <View transparent style={[styles.amountContainer, { borderColor }]}>
      <Button
        disabled={disabled}
        onPress={() => removeProductFromCart(cartItem.product.id)}
        style={[styles.amountBtn, { borderColor, borderRightWidth: 1 }]}
      >
        <Subtitle1 secondary={disabled}>-</Subtitle1>
      </Button>
      <View transparent style={{ paddingHorizontal: padding }}>
        <Body2>{cartItem.amount}</Body2>
      </View>
      <Button
        onPress={() => addProductToCart(cartItem.product)}
        style={[styles.amountBtn, { borderColor, borderLeftWidth: 1 }]}
      >
        <Subtitle1>+</Subtitle1>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: padding,
    borderRadius: padding,
    padding,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: padding,
    borderWidth: 1,
  },
  amountBtn: {
    paddingHorizontal: padding * 0.5,
  },
  img: {
    height: imageHeight,
    width: imageHeight,
    resizeMode: "cover",
    marginBottom: padding,
    marginLeft: padding,
  },
});

export default React.memo(CartItem);
