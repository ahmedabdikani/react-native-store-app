import * as React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View, Text, Card, Transparent } from "../../components/theme";
import { CartNavigationProp, CartRouteProp } from "../../types/Cart";
import { useCartContext } from "../../context/CartContext";
import CartList from "../../components/cart/CartList";
import useThemeColor from "../../hooks/useThemeColor";
import Button from "../../components/button/Button";
import { Body2, H2, H4 } from "../../components/typography";
import ButtonPrimary from "../../components/button/ButtonPrimary";
import { SetState } from "../chat/Chats";
import Shadow from "../../components/shadow/Shadow";

const spacing = 10;

interface ICartProps
  extends CartNavigationProp<"Cart">,
    CartRouteProp<"Cart"> {}

const Cart: React.FC<ICartProps> = ({ navigation, route }) => {
  const [openMore, setOpenMore] = React.useState(false);
  const { cartItems, total } = useCartContext();

  return (
    <Card style={{ flex: 1 }}>
      <Header
        length={cartItems.length}
        setOpenMore={setOpenMore}
        openMore={openMore}
      />
      <View style={{ paddingHorizontal: spacing, flex: 1 }}>
        <CartList openMore={openMore} />
      </View>
      <Footer total={total} />
    </Card>
  );
};

interface HeaderProps {
  setOpenMore: SetState<boolean>;
  openMore: boolean;
  length: number;
}

const Header = ({ length, setOpenMore, openMore }: HeaderProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <Shadow>
      <Card
        style={{
          paddingTop: top,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <H2>Shopping Cart</H2>
        <Button onPress={() => setOpenMore((prev) => !prev)}>
          <H4>{openMore ? "Hide" : "More"}</H4>
        </Button>
      </Card>
      <Card>
        <H4> Items ({length})</H4>
      </Card>
    </Shadow>
  );
};

const Footer = ({ total }: { total: number }) => {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <Card
      style={{
        padding: spacing,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: backgroundColor,
        borderBottomWidth: 2,
      }}
    >
      <Text>Sellect all</Text>
      <Transparent
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text>Total ${total}</Text>
        <ButtonPrimary style={styles.btn}>
          <Body2 style={{ color: "#fff" }}>Checkout</Body2>
        </ButtonPrimary>
      </Transparent>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: spacing,
  },
  btn: {
    marginLeft: spacing,
    alignItems: "center",
    borderRadius: spacing * 3,
  },
});

export default Cart;
