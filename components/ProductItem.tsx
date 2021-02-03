import * as React from "react";
import { Image, TouchableOpacity } from "react-native";

import { CardView, Text, useThemeColor, View } from "./Themed";
import Layout from "../constants/Layout";
import { tintColorLight } from "../constants/Colors";
import { Product } from "../Types/Product";

const { height, width } = Layout.window;
const padding = 10;
const productWidth = (width - padding * 4) / 2;

interface IProductItemProps {
  product: Product;
  navigationToProduct: (product: Product) => void;
}

const ProductItem: React.FC<IProductItemProps> = ({
  product,
  navigationToProduct,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigationToProduct(product)}
      style={{ flex: 1 }}
    >
      <CardView
        style={{
          flex: 1,
          borderRadius: padding,
          overflow: "hidden",
          width: productWidth,
        }}
      >
        <Image
          source={{ uri: product.images[0] }}
          style={{
            height: productWidth,
            width: productWidth,
            resizeMode: "cover",
            backgroundColor: "#fff",
          }}
        />
        <View style={{ padding, backgroundColor: "transparent" }}>
          <Text numberOfLines={2}>{product.title}</Text>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "transparent",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{ fontSize: 18, color: tintColorLight, fontWeight: "600" }}
            >
              {product.price}$
            </Text>
            <Text style={{ color: "#777" }}>150 people liked</Text>
          </View>
        </View>
      </CardView>
    </TouchableOpacity>
  );
};
export default ProductItem;
