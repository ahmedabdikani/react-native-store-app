import * as React from "react";
import { Image } from "react-native";

import { Card } from "../../components/theme";
import { Sizes } from "../../constants/Styles";
import { Product } from "../../types/Product";
import Button from "../../components/button/Button";
import ListFlat from "../../components/list/ListFlat";
import { useProductContext } from "../../context/ProductContext";
import { Body2, H3 } from "../../components/typography";

const itemHight = 150;
const spacing = Sizes.base;

interface IFavoritesProps {}

const Favorites = ({}: IFavoritesProps) => {
  const { products } = useProductContext();

  const FavoriteItem = ({ item }: { item: Product }) => {
    return (
      <Button style={{ flexDirection: "row", marginBottom: spacing }}>
        <Image
          source={{ uri: item.images[0] }}
          style={{
            height: itemHight,
            width: itemHight,
            resizeMode: "cover",
            borderRadius: spacing,
          }}
        />
        <Card style={{ flex: 1, padding: spacing }}>
          <Body2 numberOfLines={2}>{item.title}</Body2>
          <Body2 secondary style={{ marginTop: spacing }}>
            100 people liked
          </Body2>
          <H3
            secondary
            primary
            style={{
              marginTop: spacing,
            }}
          >
            ${item.price}
          </H3>
        </Card>
      </Button>
    );
  };

  return (
    <Card style={{ padding: spacing, flex: 1 }}>
      <ListFlat data={products}>
        {({ item }) => <FavoriteItem item={item} />}
      </ListFlat>
    </Card>
  );
};
export default Favorites;
