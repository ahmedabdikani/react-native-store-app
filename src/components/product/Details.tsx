import * as React from "react";
import { Image } from "react-native";

import { Product } from "../../types/Product";
import Layout from "../../constants/Layout";
import { Sizes } from "../../constants/Styles";
import TextTintColored from "../typography/TextPrimary";
import Card from "../theme/Card";
import Body1 from "../typography/Body1";
import Body2 from "../typography/Body2";

const { width } = Layout.window;
const spacing = Sizes.base;

const Details = ({ product }: { product: Product }) => {
  return (
    <Card
      style={{
        margin: spacing,
        padding: spacing * 2,
        borderRadius: spacing,
      }}
    >
      <TextTintColored>Price</TextTintColored>
      <Body1>
        <TextTintColored>{product?.price}$</TextTintColored>
      </Body1>
      <Body2
        style={{
          marginTop: spacing,
        }}
      >
        {product?.title}
      </Body2>
    </Card>
  );
};

const MoreDetails = ({ product }: { product: Product }) => {
  return (
    <Card style={{ paddingHorizontal: spacing }}>
      <Body2 style={{ paddingVertical: spacing }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, in maiores.
        Eligendi magni explicabo, accusantium, nisi deserunt pariatur distinctio
        quia atque esse mollitia voluptatibus ex deleniti quidem! Eum,
        consequuntur excepturi!
      </Body2>
      {product?.images.map((image, index) => {
        return (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width: width - spacing * 2, height: width }}
          />
        );
      })}
    </Card>
  );
};

export { Details, MoreDetails };
