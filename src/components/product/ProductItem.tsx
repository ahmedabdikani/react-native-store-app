import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import { Card, Text } from "../theme";
import Layout from "../../constants/Layout";
import { Product } from "../../types/Product";
import Button from "../button/Button";
import { Body1, Body2 } from "../typography";

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
  return (
    <Button onPress={() => navigationToProduct(product)}>
      <Card style={styles.constainer}>
        <SharedElement id={product.id.toString()}>
          <Image source={{ uri: product?.images[0] }} style={styles.image} />
        </SharedElement>
        <Card style={{ padding: spacing }}>
          <Body2 numberOfLines={2}>{product.title}</Body2>
          <Card
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Body1 primary>{product.price}$</Body1>
            <Text secondary>150 people liked</Text>
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
