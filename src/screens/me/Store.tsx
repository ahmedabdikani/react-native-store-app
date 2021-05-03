import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Center, CenterVertical } from "../../components/center";
import { H6, Subtitle1, Body1, ButtonText } from "../../components/typography";
import { View } from "../../components/theme";
import useHideBottomBar from "../../hooks/useHideBottomBar";
import { ProfileScreenProps } from "../../types/Profile";
import Input from "../../components/input/Input";
import { Sizes } from "../../constants/Styles";
import { useProductContext } from "../../context/product/ProductContext";
import ProductList from "../../components/product/ProductList";
import BackButtonNative from "../../components/button/BackButtonNative";
import Button from "../../components/button/Button";
import { tintColorLight } from "../../constants/Colors";

const { spacing } = Sizes;

interface StoreProps extends ProfileScreenProps<"Store"> {}

const Store: React.FC<StoreProps> = ({ navigation }) => {
  const { products } = useProductContext();
  useEffect(() => {
    const unSubscripe = useHideBottomBar(navigation.dangerouslyGetParent());

    return () => {
      unSubscripe && unSubscripe();
    };
  });

  return (
    <View style={styles.container}>
      <Header />
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <ProductList products={products} />
      </View>
    </View>
  );
};

const Header = () => {
  const navigation = useNavigation();
  const color = "#000";

  return (
    <View card style={{ paddingTop: 50, padding: spacing.s }}>
      <View row card>
        <View card>
          <CenterVertical>
            <BackButtonNative />
          </CenterVertical>
        </View>
        <View
          row
          style={{
            flex: 1,
            borderRadius: spacing.m,
            padding: spacing.s / 2,
          }}
        >
          <View>
            <CenterVertical>
              <FontAwesome name="search" size={20} />
            </CenterVertical>
          </View>
          <Input placeholder={"Search"} />
        </View>
        <Center>
          <Button onPress={() => navigation.navigate("AddProduct")}>
            <Subtitle1 primary>Add product</Subtitle1>
          </Button>
        </Center>
      </View>
      <H6>Furniture1</H6>
      <View row card style={{ alignItems: "center" }}>
        <ButtonText>all items</ButtonText>
        <ButtonText> new items </ButtonText>
        <View transparent row style={{ alignItems: "center" }}>
          <ButtonText> price </ButtonText>
          <View
            transparent
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="caret-up" color={tintColorLight} />
            <FontAwesome name="caret-down" color={color} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: spacing.s,
  },
});

export default Store;
