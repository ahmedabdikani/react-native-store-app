import * as React from "react";
import { Image } from "react-native";

import { Product } from "../../types/Product";
import Layout from "../../constants/Layout";
import { Sizes } from "../../constants/Styles";
import Card from "../theme/Card";
import { Caption, Subtitle1, Body1 } from "../typography";

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
      <Caption primary>Price</Caption>
      <Subtitle1 primary>{product?.price}$</Subtitle1>
      <Body1
        style={{
          marginTop: spacing / 2,
        }}
      >
        {product?.title}
      </Body1>
    </Card>
  );
};

const MoreDetails = ({ product }: { product: Product }) => {
  return (
    <Card style={{ paddingHorizontal: spacing }}>
      <Body1 style={{ paddingVertical: spacing }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, in maiores.
        Eligendi magni explicabo, accusantium, nisi deserunt pariatur distinctio
        quia atque esse mollitia voluptatibus ex deleniti quidem! Eum,
        consequuntur excepturi!
      </Body1>
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
