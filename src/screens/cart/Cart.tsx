import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View, Text } from "../../components/theme";
import { CartNavigationProp, CartRouteProp } from "../../types/Cart";
import { useCartContext } from "../../context/cart/CartContext";
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
import { useLanguage } from "../../context/language/LanguageContex";
import Gradient from "../../components/Gradient";
import SelectionToggleIcon from "../../components/cart/SelectionToggleIcon";

const spacing = 10;

interface ICartProps
  extends CartNavigationProp<"Cart">,
    CartRouteProp<"Cart"> {}

const Cart: React.FC<ICartProps> = ({ navigation, route }) => {
  const [openMore, setOpenMore] = React.useState(false);
  const { cartItems, total } = useCartContext();

  const allSelected = cartItems.every((cartItem) => cartItem.selected);

  return (
    <View card style={{ flex: 1 }}>
      <Header
        length={cartItems.length}
        setOpenMore={setOpenMore}
        openMore={openMore}
      />
      <View style={{ paddingHorizontal: spacing, flex: 1 }}>
        <CartList openMore={openMore} />
      </View>
      <Footer total={total} allSelected={allSelected} />
    </View>
  );
};

interface HeaderProps {
  setOpenMore: SetState<boolean>;
  openMore: boolean;
  length: number;
}

const Header = ({ length, setOpenMore, openMore }: HeaderProps) => {
  const { top } = useSafeAreaInsets();
  const { language } = useLanguage();
  return (
    <Shadow
      style={{
        padding: spacing,
        paddingTop: top,
      }}
    >
      <View
        card
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H6>{language.shoppingCart}</H6>
        <Button onPress={() => setOpenMore((prev) => !prev)}>
          <Subtitle1 style={{ margin: spacing }}>
            {openMore ? "Hide" : "More"}
          </Subtitle1>
        </Button>
      </View>
      <View card>
        <Subtitle2 style={{ marginLeft: spacing }}>
          {language.items} ({length})
        </Subtitle2>
      </View>
    </Shadow>
  );
};

const Footer = ({
  total,
  allSelected,
}: {
  total: number;
  allSelected: boolean;
}) => {
  const borderColor = useThemeColor({}, "background");
  const { selecteAllProducts } = useCartContext();

  return (
    <View card style={[styles.footerContainer, { borderColor }]}>
      <Button onPress={selecteAllProducts}>
        <View transparent row>
          <SelectionToggleIcon condition={allSelected && total > 0} />
          <Text style={{ marginLeft: spacing }}>Sellect all</Text>
        </View>
      </Button>
      <View
        transparent
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text>Total: ${total}</Text>
        <Button primary style={styles.btn}>
          <Gradient>
            <ButtonText style={{ color: "#fff", padding: spacing }}>
              Checkout
            </ButtonText>
          </Gradient>
        </Button>
      </View>
    </View>
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
    overflow: "hidden",
    backgroundColor: "red",
    height: 40,
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
