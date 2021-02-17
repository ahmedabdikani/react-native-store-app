import * as React from "react";
import { Image, StyleSheet } from "react-native";

import { CardView, Text } from "../Theme";
import useThemeColor from "../../hooks/useThemeColor";
import Layout from "../../constants/Layout";
import { tintColorLight } from "../../constants/Colors";
import { Product } from "../../types/Product";
import Button from "../button/Button";
import Body2 from "../typography/Body2";

const { width } = Layout.window;
const spacing = 10;
const productWidth = (width - spacing * 4) / 2;

interface ProductItemProps {
  product: Product;
  navigationToProduct: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  navigationToProduct,
}) => {
  const secondaryColor = useThemeColor({}, "textSecondary");

  return (
    <Button onPress={() => navigationToProduct(product)}>
      <CardView style={styles.constainer}>
        <Image source={{ uri: product?.images[0] }} style={styles.image} />
        <CardView style={{ padding: spacing }}>
          <Text numberOfLines={2}>{product.title}</Text>
          <CardView
            style={{
              marginTop: spacing / 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Body2 style={{ color: tintColorLight }}>{product.price}$</Body2>
            <Text style={{ color: secondaryColor }}>150 people liked</Text>
          </CardView>
        </CardView>
      </CardView>
    </Button>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    borderRadius: spacing,
    overflow: "hidden",
    width: productWidth,
    marginRight: spacing,
  },
  image: {
    height: productWidth,
    width: productWidth,
    resizeMode: "cover",
    backgroundColor: "#fff",
  },
});

export default ProductItem;
