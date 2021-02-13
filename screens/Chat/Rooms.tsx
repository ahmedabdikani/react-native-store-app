import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../components/button/Button";
import FlatList from "../../components/list/Flat";

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

const Rooms: React.FC<IRoomsProps> = ({}) => {
  const { user } = useAuthContext();
  const { top } = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "background");
  const card = useThemeColor({}, "card");
  const color = useThemeColor({}, "text");
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header setOpenMenu={setOpenMenu} />
      <FlatList style={{ backgroundColor: card, padding }} data={chats}>
        {({ item, index }) => <RoomItem item={item} />}
      </FlatList>

      {openMenu && <MoreOptionsMenu />}
    </View>
  );
};

const MoreOptionsMenu = () => {
  const navigation = useNavigation();
  const color = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

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
      <Button
        onPress={() => null}
        style={({ pressed }) => ({
          flexDirection: "row",
          marginBottom: padding,
        })}
      >
        <Ionicons name="chatbubble" size={24} color={color} />

        <Text style={{ ...Fonts.body2, marginLeft: padding }}>New Chat</Text>
      </Button>
      <Button
        onPress={() => navigation.navigate("AddContact")}
        style={({ pressed }) => ({
          flexDirection: "row",
          marginBottom: padding,
        })}
      >
        <Ionicons name="person-add" size={24} color={color} />
        <Text style={{ ...Fonts.body2, marginLeft: padding }}>
          Add Contacts
        </Text>
      </Button>
    </View>
  );
};

const Header = ({
  setOpenMenu,
}: {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { top } = useSafeAreaInsets();
  const color = useThemeColor({}, "text");
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
        <Button onPress={() => setOpenMenu((prev) => !prev)}>
          <Ionicons name={"add"} size={30} color={color} />
        </Button>
      </CardView>
    </CardView>
  );
};

const RoomItem = ({ item }: { item: typeof chats[number] }) => {
  const navigation = useNavigation();

  const backgroundColor = useThemeColor({}, "background");
  return (
    <Button
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
          paddingBottom: padding * 2,
        }}
      >
        <Text style={Fonts.h4}>{item.user.name}</Text>
        <TextSec numberOfLines={1} style={Fonts.body3}>
          {item.messages[0]}
        </TextSec>
      </CardView>
    </Button>
  );
};

export default Rooms;
