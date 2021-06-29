import React, { useEffect } from "react";
import { Image } from "react-native";

import { View } from "../../components/theme";
import { Sizes } from "../../constants/Styles";
import { Product } from "../../types/Product";
import Button from "../../components/button/Button";
import ListFlat from "../../components/list/ListFlat";
import { useProductContext } from "../../context/product";
import { Body2, Subtitle1 } from "../../components/typography";
import useHideBottomBar from "../../hooks/useHideBottomBar";
import { ProfileScreenProps } from "../../types/Profile";
import { useFavorateContext } from "../../context/favorites";

const itemHight = 150;
const spacing = Sizes.spacing.s;

interface FavoritesProps extends ProfileScreenProps<"Me"> {}

const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
  const { products } = useProductContext();
  const { favorites } = useFavorateContext();
  useEffect(() => {
    const unSubscripe = useHideBottomBar(navigation.dangerouslyGetParent());
    return () => {
      unSubscripe && unSubscripe();
    };
  }, [navigation]);

  return (
    <View card style={{ padding: spacing, flex: 1 }}>
      <ListFlat data={favorites}>
        {({ item }) => <FavoriteItem item={item} />}
      </ListFlat>
    </View>
  );
};
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
      <View card style={{ flex: 1, padding: spacing }}>
        <Body2 numberOfLines={2}>{item.title}</Body2>
        <Body2 secondary style={{ marginTop: spacing }}>
          100 people liked
        </Body2>
        <Subtitle1
          secondary
          primary
          style={{
            marginTop: spacing,
          }}
        >
          ${item.price}
        </Subtitle1>
      </View>
    </Button>
  );
};

export default Favorites;
