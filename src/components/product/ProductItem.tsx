import React from "react";
import { StyleSheet } from "react-native";
import Image from "../image"
import { SharedElement } from "react-navigation-shared-element";

import { View } from "../theme";
import Layout from "../../constants/Layout";
import { Product } from "../../types/Product";
import Button from "../button/Button";
import { Body1, Body2, Caption } from "../typography";

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
      <View card style={styles.constainer}>
        <SharedElement id={product.id.toString()}>
          <Image source={{ uri: product?.images[0] }} style={styles.image} />
        </SharedElement>
        <View card style={{ padding: spacing }}>
          <Body2 numberOfLines={2}>{product.title}</Body2>
          <View
            card
            row
            style={{
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Body1 primary>{product.price}$</Body1>
            <Caption secondary>150 people liked</Caption>
          </View>
        </View>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  constainer: {
    // flex: 1,
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
