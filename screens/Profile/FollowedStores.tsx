import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { Image, ListRenderItem } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../../components/Avatar";
import {
  CardView,
  Text,
  TextSec,
  useThemeColor,
  View,
} from "../../components/Themed";
import { Fonts, Sizes } from "../../constants/Styles";
import { product } from "../../types/Product";
import { products } from "../home/Home";

const padding = Sizes.base;

interface IFollowedStoresProps {}

const FollowedStores = ({}: IFollowedStoresProps) => {
  const textColor = useThemeColor({}, "text");
  const StorePost: ListRenderItem<product> | null | undefined = ({
    item,
    index,
  }) => {
    return (
      <CardView
        style={{
          borderRadius: padding,
          padding,
          flexDirection: "row",
          marginBottom: padding,
          paddingVertical: padding * 2,
          overflow: "hidden",
        }}
      >
        <Avatar imageUri={item.images[0]} initial={item.title} />

        <CardView
          style={{
            marginLeft: padding,
            flex: 1,
          }}
        >
          <CardView
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <CardView>
              <Text style={{ ...Fonts.h3 }}>Store{index + 1}</Text>
              <TextSec style={{ ...Fonts.body4 }}>
                Followed {index + 1} month ago
              </TextSec>
            </CardView>
            <MaterialIcons name="more-horiz" size={24} color={textColor} />
          </CardView>

          <CardView
            style={{ flexDirection: "row", flex: 1, paddingVertical: padding }}
          >
            {item.images.map((imageUri, index) => {
              return (
                <TouchableOpacity key={index} style={{ marginRight: padding }}>
                  <Image
                    source={{ uri: imageUri }}
                    style={{
                      height: 50,
                      width: 50,
                      resizeMode: "cover",
                      borderRadius: padding * 0.5,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </CardView>
        </CardView>
      </CardView>
    );
  };

  return (
    <View style={{ flex: 1, padding }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={StorePost}
      />
    </View>
  );
};
export default FollowedStores;
