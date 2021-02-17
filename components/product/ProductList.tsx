import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";

import { tintColorLight } from "../../constants/Colors";
import { Product } from "../../types/Product";
import FlatList from "../list/ListFlat";
import ProductItem from "./ProductItem";
import { Text, View } from "../Theme";
import { Sizes } from "../../constants/Styles";

const spacing = Sizes.base;
const numColmns = 2;

interface IProductListProps {
  products: Product[];
}

const ProductList: React.FC<IProductListProps> = ({ products }) => {
  const navigation = useNavigation();

  const navigationToProduct = React.useCallback(
    (product: Product) => {
      navigation.navigate("Product", { product });
    },
    [navigation]
  );

  return (
    <FlatList
      data={products}
      numColumns={numColmns}
      columnWrapperStyle={{ marginBottom: spacing }}
    >
      {({ item, index }) => (
        <ProductItem
          key={index}
          product={item}
          navigationToProduct={navigationToProduct}
        />
      )}
    </FlatList>
  );
};

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: spacing,
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
