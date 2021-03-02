import * as React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View, Text, Card } from "../../components/theme";
import { CartNavigationProp, CartRouteProp } from "../../types/Cart";
import { useCartContext } from "../../context/CartContext";
import CartList from "../../components/cart/CartList";
import useThemeColor from "../../hooks/useThemeColor";
import Button from "../../components/button/Button";
import {
  ButtonText,
  H6,
  Subtitle1,
  Subtitle2,
} from "../../components/typography";
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
    <Shadow
      style={{
        padding: spacing,
        paddingTop: top,
      }}
    >
      <Card
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H6>Shopping Cart</H6>
        <Button onPress={() => setOpenMore((prev) => !prev)}>
          <Subtitle1 style={{ margin: spacing }}>
            {openMore ? "Hide" : "More"}
          </Subtitle1>
        </Button>
      </Card>
      <Card>
        <Subtitle2 style={{ marginLeft: spacing }}> Items ({length})</Subtitle2>
      </Card>
    </Shadow>
  );
};

const Footer = ({ total }: { total: number }) => {
  const borderColor = useThemeColor({}, "background");
  return (
    <Card style={[styles.footerContainer, { borderColor }]}>
      <Text>Sellect all</Text>
      <View
        transparent
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text>Total ${total}</Text>
        <Button primary style={styles.btn}>
          <ButtonText style={{ color: "#fff", padding: spacing }}>
            Checkout
          </ButtonText>
        </Button>
      </View>
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
    borderRadius: spacing * 3,
  },
  footerContainer: {
    padding: spacing,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
  },
});

export default Cart;
