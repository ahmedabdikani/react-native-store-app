import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../../components/button/Button";
import FlatList from "../../components/list/ListFlat";
import { Card, TextSec, View } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { Sizes } from "../../constants/Styles";
import { useChatContext } from "../../context/ChatContext";
import Avatar from "../../components/Avatar";
import { Body2, H2, H4 } from "../../components/typography";
import Shadow from "../../components/shadow/Shadow";
import { SetState } from "./Chats";

const padding = Sizes.base;

interface RoomsProps {}

const Rooms: React.FC<RoomsProps> = ({}) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const { rooms } = useChatContext();

  return (
    <View style={{ flex: 1 }}>
      <Header setOpenMenu={setOpenMenu} />
      <View>
        <FlatList style={{ padding }} data={rooms}>
          {({ item, index }) => <RoomItem item={item} />}
        </FlatList>
      </View>

      {openMenu && <MoreOptionsMenu />}
    </View>
  );
};

const MoreOptionsMenu = () => {
  const navigation = useNavigation();
  const color = useThemeColor({}, "text");

  return (
    <View
      style={{
        position: "absolute",
        top: 100,
        right: padding,
        zIndex: 20,
        padding: padding * 2,
        elevation: 20,
        borderRadius: padding,
      }}
    >
      <Button
        onPress={() => null}
        style={{
          flexDirection: "row",
          marginBottom: padding,
          alignItems: "center",
        }}
      >
        <Ionicons name="chatbubble-outline" size={24} color={color} />

        <Body2 style={{ marginLeft: padding }}>New Chat</Body2>
      </Button>
      <Button
        onPress={() => navigation.navigate("Contacts")}
        style={{
          flexDirection: "row",
          marginBottom: padding,
          alignItems: "center",
        }}
      >
        <Ionicons name="person-add-outline" size={24} color={color} />
        <Body2 style={{ marginLeft: padding }}>Add Contacts</Body2>
      </Button>
    </View>
  );
};

const Header = ({ setOpenMenu }: { setOpenMenu: SetState<boolean> }) => {
  const { top } = useSafeAreaInsets();
  const color = useThemeColor({}, "text");
  return (
    <Shadow>
      <Card
        style={{
          paddingTop: top,
          paddingHorizontal: padding,
          paddingBottom: padding,
        }}
      >
        <Card
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <H2>Chats</H2>
          <Button onPress={() => setOpenMenu((prev) => !prev)}>
            <Ionicons name={"add"} size={30} color={color} />
          </Button>
        </Card>
      </Card>
    </Shadow>
  );
};

const RoomItem = ({ item }) => {
  const navigation = useNavigation();

  const backgroundColor = useThemeColor({}, "background");
  return (
    <Button
      onPress={() => navigation.navigate("Chat", { item })}
      style={{
        flexDirection: "row",
        marginBottom: padding,
        alignItems: "center",
      }}
    >
      <Avatar
        backgroundColor={"#000"}
        imageUri={item?.member?.photoUrl}
        initial={item?.member?.name}
      />
      <Card
        style={{
          flex: 1,
          borderBottomColor: backgroundColor,
          borderBottomWidth: 1,
          padding,
        }}
      >
        <H4>{item?.member?.name}</H4>
        <TextSec numberOfLines={1} style={{ marginLeft: padding }}>
          {item?.lastMessage}
        </TextSec>
      </Card>
    </Button>
  );
};

export default Rooms;
