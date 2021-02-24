import * as React from "react";
import { Image, StyleSheet } from "react-native";

import { Card, Text } from "../theme";
import useThemeColor from "../../hooks/useThemeColor";
import Layout from "../../constants/Layout";
import { tintColorLight } from "../../constants/Colors";
import { Product } from "../../types/Product";
import Button from "../button/Button";
import Body1 from "../typography/Body1";
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
      <Card style={styles.constainer}>
        <Image source={{ uri: product?.images[0] }} style={styles.image} />
        <Card style={{ padding: spacing }}>
          <Body2 numberOfLines={2}>{product.title}</Body2>
          <Card
            style={{
              marginTop: spacing / 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Body1 style={{ color: tintColorLight }}>{product.price}$</Body1>
            <Text style={{ color: secondaryColor }}>150 people liked</Text>
          </Card>
        </Card>
      </Card>
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
