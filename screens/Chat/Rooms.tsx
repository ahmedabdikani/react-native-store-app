import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import * as React from "react";
import { useState } from "react";
import { FlatList, Image, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  CardView,
  Text,
  TextSec,
  useThemeColor,
  View,
} from "../../components/Themed";
import Layout from "../../constants/Layout";
import { Fonts, Sizes } from "../../constants/Styles";
import { useAuthContext } from "../../context/AuthContext";
import navigation from "../../navigation";

const { height, width } = Layout.window;
const padding = Sizes.base;

interface IRoomsProps {}

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

const Rooms = ({ navigation }: IRoomsProps) => {
  const { user } = useAuthContext();
  const { top } = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "background");
  const card = useThemeColor({}, "card");
  const color = useThemeColor({}, "text");
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header top={top} color={color} setOpenMenu={setOpenMenu} />
      {renderRooms({ navigation, backgroundColor, card })}
      {openMenu && (
        <MoreOptionMenu
          backgroundColor={backgroundColor}
          navigation={navigation}
          color={color}
        />
      )}
    </View>
  );
};

const MoreOptionMenu = ({ backgroundColor, navigation, color }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 80,
        right: padding,
        zIndex: 20,
        padding: padding * 2,
        elevation: 20,
        borderRadius: padding,
      }}
    >
      <CardView
        style={{
          backgroundColor: "transparent",
          height: 10,
          width: 10,
          position: "absolute",
          right: padding,
          top: -10,
          borderLeftColor: "transparent",
          borderLeftWidth: 10,
          borderRightColor: "transparent",
          borderRightWidth: 10,
          borderBottomColor: backgroundColor,
          borderBottomWidth: 10,
        }}
      />
      <Pressable
        onPress={() => null}
        style={({ pressed }) => ({
          flexDirection: "row",
          opacity: pressed ? 0.3 : 1,
          marginBottom: padding,
          alignItems: "center",
        })}
      >
        <Ionicons name="chatbubble" size={24} color={color} />

        <Text style={{ ...Fonts.body2, marginLeft: padding }}>New Chat</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("AddContact")}
        style={({ pressed }) => ({
          flexDirection: "row",
          opacity: pressed ? 0.3 : 1,
          alignItems: "center",
          marginBottom: padding,
        })}
      >
        <Ionicons name="person-add" size={24} color={color} />
        <Text style={{ ...Fonts.body2, marginLeft: padding }}>
          Add Contacts
        </Text>
      </Pressable>
    </View>
  );
};

const Header = ({ top, color, setOpenMenu }) => {
  return (
    <CardView
      style={{
        paddingTop: top + padding,
        paddingHorizontal: padding,
        elevation: 10,
        paddingBottom: padding,
      }}
    >
      <CardView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={Fonts.h2}>Chats</Text>
        <Pressable
          onPress={() => setOpenMenu((prev) => !prev)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.3 : 1,
          })}
        >
          <Ionicons name={"add"} size={30} color={color} />
        </Pressable>
      </CardView>
    </CardView>
  );
};

const renderRooms = ({ navigation, backgroundColor, card }) => {
  const renderItem = ({ item }: { item: typeof chats[0] }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        style={{ flexDirection: "row", marginBottom: padding }}
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
        <CardView
          style={{
            flex: 1,
            borderBottomColor: backgroundColor,
            borderBottomWidth: 1,
            paddingBottom: padding,
          }}
        >
          <Text style={Fonts.h4}>{item.user.name}</Text>
          <TextSec numberOfLines={1} style={Fonts.body3}>
            {item.messages[0]}
          </TextSec>
        </CardView>
      </TouchableOpacity>
    );
  };

  const listEmptyComponent = () => {
    return (
      <View
        style={{
          height: height * 0.9,
          width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextSec style={{ ...Fonts.h4 }}>No chats</TextSec>
      </View>
    );
  };

  return (
    <FlatList
      style={{ backgroundColor: card, padding }}
      keyExtractor={(_, index) => index.toString()}
      data={chats}
      ListEmptyComponent={listEmptyComponent}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default Rooms;
