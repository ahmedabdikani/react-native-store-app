import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";

import { tintColorLight } from "../../constants/Colors";
import { Product } from "../../types/Product";
import FlatList from "../list/ListFlat";
import ProductItem from "./ProductItem";
import { View } from "../theme";
import { Sizes } from "../../constants/Styles";
import { Subtitle1 } from "../typography";
import { StyleSheet } from "react-native";
import { useLanguage } from "../../context/LanguageContex";

const spacing = Sizes.base;
const numColmns = 2;

interface IProductListProps {
  products: Product[];
}

const ProductList: React.FC<IProductListProps> = ({ products }) => {
  const navigation = useNavigation();

  const navigationToProduct = (product: Product) => {
    navigation.navigate("Product", { product });
  };

  return (
    <FlatList
      data={products}
      numColumns={numColmns}
      columnWrapperStyle={{ marginBottom: spacing }}
      ListHeaderComponent={Header}
    >
      {({ item, index }) => (
        <ProductItem product={item} navigationToProduct={navigationToProduct} />
      )}
    </FlatList>
  );
};

const Header = () => {
  const { language } = useLanguage();
  return (
    <View style={styles.headerContainer}>
      <FontAwesome name={"heart"} size={18} color={tintColorLight} />
      <Subtitle1
        primary
        style={{
          marginHorizontal: 10,
        }}
      >
        {language.youMayLike}
      </Subtitle1>
      <FontAwesome name={"heart"} size={18} color={tintColorLight} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginVertical: spacing,
    alignSelf: "center",
    alignItems: "center",
  },
});

export default ProductList;
