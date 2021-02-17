import * as React from "react";
import { Image } from "react-native";
import { CardView, Text, TextSec } from "../../components/Theme";
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
        <CardView style={{ flex: 1, padding: spacing }}>
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
        </CardView>
      </Button>
    );
  };

  return (
    <CardView style={{ padding: spacing }}>
      <ListFlat data={products}>
        {({ item }) => <FavoriteItem item={item} />}
      </ListFlat>
    </CardView>
  );
};
export default Favorites;
