import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { tintColorLight } from "../constants/Colors";
import { HomeStackPramList } from "../types";
import { product } from "../Types/Product";
import Product from "./Product";

import { Text, View } from "./Themed";
const margin = 10;
const numColmns = 2;

interface IProductsProps {
  navigation: NavigationProp<HomeStackPramList, "Home">;
  products: product[];
}

const Products = ({ navigation, products }: IProductsProps) => {
  const navigationToProduct = (product: product) => {
    navigation.navigate("Product", { product });
  };

  return (
    <View style={{}}>
      <FlatList
        numColumns={numColmns}
        ListHeaderComponentStyle={{
          marginBottom: margin,
          alignItems: "center",
          alignSelf: "center",
        }}
        ListHeaderComponent={Header}
        // scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({ item: product }) => {
          return (
            <View style={{ marginRight: 10, marginBottom: 10 }}>
              <Product
                product={product}
                navigationToProduct={navigationToProduct}
              />
            </View>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const Header = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <FontAwesome name={"heart"} size={18} color={tintColorLight} />
      <Text
        style={{
          marginHorizontal: 10,
          color: tintColorLight,
          fontWeight: "bold",
        }}
      >
        You may Like
      </Text>
      <FontAwesome name={"heart"} size={18} color={tintColorLight} />
    </View>
  );
};
export default Products;
