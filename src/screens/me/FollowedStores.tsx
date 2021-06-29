import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";

import Avatar from "../../components/Avatar";
import { View } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { Sizes } from "../../constants/Styles";
import { Product } from "../../types/Product";
import ListFlat from "../../components/list/ListFlat";
import { useProductContext } from "../../context/product";
import Button from "../../components/button/Button";
import { Body2, Subtitle1 } from "../../components/typography";
import useHideBottomBar from "../../hooks/useHideBottomBar";
import { ProfileScreenProps } from "../../types/Profile";

const padding = Sizes.spacing.s;

interface FollowedStoresProps extends ProfileScreenProps<"Me"> {}

const FollowedStores = ({ navigation }: FollowedStoresProps) => {
  const { products } = useProductContext();
  const color = useThemeColor({}, "text");
  useEffect(() => {
    const unSubscripe = useHideBottomBar(navigation.dangerouslyGetParent());
    return () => {
      unSubscripe && unSubscripe();
    };
  }, [navigation]);
  const StorePost = ({ item, index }: { item: Product; index: number }) => {
    return (
      <View
        card
        row
        style={{
          borderRadius: padding,
          padding,
          marginBottom: padding,
          paddingVertical: padding * 2,
          overflow: "hidden",
        }}
      >
        <Avatar imageUri={item.images[0]} initial={item.title} />

        <View
          card
          style={{
            marginLeft: padding,
            flex: 1,
          }}
        >
          <View
            card
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View card>
              <Subtitle1>Store{index + 1}</Subtitle1>
              <Body2>Followed {index + 1} month ago</Body2>
            </View>
            <MaterialIcons name="more-horiz" size={24} color={color} />
          </View>

          <View
            card
            style={{ flexDirection: "row", flex: 1, paddingVertical: padding }}
          >
            {item.images.map((imageUri, index) => {
              return (
                <Button key={index} style={{ marginRight: padding }}>
                  <Image
                    source={{ uri: imageUri }}
                    style={{
                      height: 50,
                      width: 50,
                      resizeMode: "cover",
                      borderRadius: padding * 0.5,
                    }}
                  />
                </Button>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding }}>
      <ListFlat data={products}>{(props) => <StorePost {...props} />}</ListFlat>
    </View>
  );
};
export default FollowedStores;
