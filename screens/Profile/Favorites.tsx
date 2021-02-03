import * as React from "react";
import { Image, ListRenderItem } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { CardView, Text, TextSec, View } from "../../components/Themed";
import { tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Fonts, Sizes } from "../../constants/Styles";
import { product } from "../../Types/Product";
import { products } from "../Home/Home";

const { width, height } = Layout.window;
const padding = Sizes.base;

interface IFavoritesProps {}

const Favorites = ({}: IFavoritesProps) => {
  const FavoriteItem: ListRenderItem<product> = ({ item }) => {
    return (
      <TouchableOpacity style={{ flexDirection: "row", marginBottom: padding }}>
        <Image
          source={{ uri: item.images[0] }}
          style={{
            height: 150,
            width: 150,
            resizeMode: "cover",
            borderRadius: padding,
          }}
        />
        <CardView style={{ flex: 1, padding }}>
          <Text numberOfLines={2} style={Fonts.body2}>
            {item.title}
          </Text>
          <TextSec style={{ marginTop: padding * 0.5, ...Fonts.body3 }}>
            100 people liked
          </TextSec>
          <TextSec
            style={{
              ...Fonts.h3,
              color: tintColorLight,
              marginTop: padding * 1.5,
            }}
          >
            ${item.price}
          </TextSec>
        </CardView>
      </TouchableOpacity>
    );
  };

  return (
    <CardView style={{ padding }}>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={FavoriteItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </CardView>
  );
};
export default Favorites;
