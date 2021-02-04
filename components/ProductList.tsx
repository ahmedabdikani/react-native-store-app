import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { tintColorLight } from "../constants/Colors";
import { HomeStackPramList } from "../types";
import { HomeNavigationProp } from "../Types/Home";
import { Product } from "../Types/Product";
import ProductItem from "./ProductItem";

import { Text, View } from "./Themed";
const margin = 10;
const numColmns = 2;

interface IProductListProps {
  products: Product[];
}

const ProductList: React.FC<IProductListProps> = ({ products }) => {
  const navigation = useNavigation<HomeNavigationProp<"Home">["navigation"]>();
  const navigationToProduct = (product: Product) => {
    navigation.navigate("Product", { product });
  };

  return (
    <View
      style={{
        flex: 1,
        marginBottom: margin,
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Header />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          flex: 1,
        }}
      >
        {products?.map((product, index) => (
          <View style={{ marginRight: 10, marginBottom: 10 }}>
            <ProductItem
              key={index}
              product={product}
              navigationToProduct={navigationToProduct}
            />
          </View>
        ))}
      </View>
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
export default ProductList;
