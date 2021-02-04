import * as React from "react";
import { Image } from "react-native";

import { CardView, Text, useThemeColor, View } from "./Themed";
import Layout from "../constants/Layout";
import { tintColorLight } from "../constants/Colors";
import { Product } from "../Types/Product";
import Button from "./Button";
import { Fonts } from "../constants/Styles";

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
  const secondaryColor = useThemeColor({}, "textSecondary");

  return (
    <Button onPress={() => navigationToProduct(product)} style={{ flex: 1 }}>
      <CardView
        style={{
          flex: 1,
          borderRadius: padding,
          overflow: "hidden",
          width: productWidth,
        }}
      >
        <Image
          source={{ uri: product?.images[0] }}
          style={{
            height: productWidth,
            width: productWidth,
            resizeMode: "cover",
            backgroundColor: "#fff",
          }}
        />
        <CardView style={{ padding }}>
          <Text numberOfLines={2}>{product.title}</Text>
          <CardView
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ ...Fonts.h3, color: tintColorLight }}>
              {product.price}$
            </Text>
            <Text style={{ color: secondaryColor }}>150 people liked</Text>
          </CardView>
        </CardView>
      </CardView>
    </Button>
  );
};
export default ProductItem;
