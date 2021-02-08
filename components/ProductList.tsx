import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import * as React from "react";
import { FlatList, ListRenderItem } from "react-native";

import { tintColorLight } from "../constants/Colors";
import { HomeStackPramList } from "../types";
import { HomeNavigationProp } from "../types/Home";
import { Product } from "../types/Product";
import ProductItem from "./ProductItem";

import { Text, View } from "./Themed";
const padding = 10;
const numColmns = 2;

interface IProductListProps {
  products: Product[];
}

const ProductList: React.FC<IProductListProps> = ({ products }) => {
  const navigation = useNavigation<HomeNavigationProp<"Home">["navigation"]>();
  const navigationToProduct = (product: Product) => {
    navigation.navigate("Product", { product });
  };

  const renderItem: ListRenderItem<Product> = ({ item: product, index }) => (
    <ProductItem
      key={index}
      product={product}
      navigationToProduct={navigationToProduct}
    />
  );

  return (
    <FlatList
      ListHeaderComponent={Header}
      contentContainerStyle={{ alignItems: "center" }}
      columnWrapperStyle={{ marginBottom: padding }}
      numColumns={numColmns}
      data={products}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: padding,
        alignSelf: "center",
      }}
    >
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
export default ProductList;
