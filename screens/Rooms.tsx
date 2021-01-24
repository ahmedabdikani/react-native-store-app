import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import * as React from "react";
import { FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CardView, Text, TextSec, View } from "../components/Themed";
import Layout from "../constants/Layout";
import { Fonts, Sizes } from "../constants/Styles";
import navigation from "../navigation";

const { height, width } = Layout.window;
const padding = Sizes.base;

interface IChatsProps {}

const chats = Array.from({ length: 20 }, (_, index) => {
  return {
    id: Math.random() * 1000000,
    user: {
      id: Math.random() * 1000000,
      name: "user" + index,
      photo: "https://source.unsplash.com/random/" + index * 100,
    },
    messages: ["Lorem ipsum dolor sit amet consectetur adipisicing elit"],
  };
});

const Chats = ({ navigation }: IChatsProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <CardView style={{ flex: 1 }}>
      <CardView
        style={
          {
            //height: top
          }
        }
      />
      <CardView style={{ padding: Sizes.base }}>
        {/* {renderHeader()} */}
        {renderRooms(navigation)}
      </CardView>
    </CardView>
  );
};

const renderHeader = () => {
  return (
    <CardView>
      <CardView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={Fonts.h2}>Chats</Text>
        <Ionicons name={"add"} size={30} />
      </CardView>
    </CardView>
  );
};

const renderRooms = (navigation) => {
  const renderItem = ({ item }: { item: typeof chats[0] }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        style={{ flexDirection: "row" }}
      >
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            resizeMode: "cover",
            marginRight: padding,
          }}
          source={{ uri: item.user.photo }}
        />
        <CardView style={{ flex: 1 }}>
          <Text style={Fonts.h4}>{item.user.name}</Text>
          <TextSec numberOfLines={1} style={Fonts.body3}>
            {item.messages[0]}
          </TextSec>
        </CardView>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorComponent = () => {
    return <View style={{ height: 2, marginVertical: padding }} />;
  };

  return (
    <FlatList
      style={{ marginTop: padding }}
      keyExtractor={(_, index) => index.toString()}
      data={chats}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
    />
  );
};

export default Chats;
