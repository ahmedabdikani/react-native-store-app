import * as React from "react";
import { Image } from "react-native";
import { Card, Text, TextSec } from "../../components/theme";
import { tintColorLight } from "../../constants/Colors";
import { Fonts, Sizes } from "../../constants/Styles";
import { Product } from "../../types/Product";
import Button from "../../components/button/Button";
import ListFlat from "../../components/list/ListFlat";
import { useProductContext } from "../../context/ProductContext";

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
            height: 150,
            width: 150,
            resizeMode: "cover",
            borderRadius: spacing,
          }}
        />
        <Card style={{ flex: 1, padding: spacing }}>
          <Text numberOfLines={2} style={Fonts.body2}>
            {item.title}
          </Text>
          <TextSec style={{ marginTop: spacing * 0.5, ...Fonts.body3 }}>
            100 people liked
          </TextSec>
          <TextSec
            style={{
              ...Fonts.h3,
              color: tintColorLight,
              marginTop: spacing * 1.5,
            }}
          >
            ${item.price}
          </TextSec>
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
