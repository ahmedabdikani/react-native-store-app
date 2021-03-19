import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import moment from "moment";

import Button from "../../components/button/Button";
import FlatList from "../../components/list/ListFlat";
import { View } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { Sizes } from "../../constants/Styles";
import { useChatContext } from "../../context/ChatContext";
import Avatar from "../../components/Avatar";
import { Body2, H6, Subtitle1 } from "../../components/typography";
import Shadow from "../../components/shadow/Shadow";
import { SetState } from "./Chats";

const padding = Sizes.base;
moment.updateLocale("en", {
  relativeTime: {
    s: "a moment",
    ss: "%d s",
    m: "a m",
    mm: "%d m",
    h: "an h",
    hh: "%d h",
    d: "a d",
    dd: "%d d",
    w: "a w",
    ww: "%d w",
    M: "a m",
    MM: "%d m",
    y: "a y",
    yy: "%d y",
  },
});

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
      <View
        card
        style={{
          paddingTop: top,
          paddingHorizontal: padding,
          paddingBottom: padding,
        }}
      >
        <View
          card
          flexR
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <H6>Chats</H6>
          <Button onPress={() => setOpenMenu((prev) => !prev)}>
            <Ionicons name={"add"} size={30} color={color} />
          </Button>
        </View>
      </View>
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
      <Avatar imageUri={item?.photoUrl} initial={item?.name} />
      <View
        style={{
          flex: 1,
          borderBottomColor: backgroundColor,
          borderBottomWidth: 1,
          padding,
        }}
      >
        <Subtitle1>{item?.name}</Subtitle1>
        <Body2 secondary numberOfLines={1}>
          {item?.value}
        </Body2>
      </View>
      <View>
        <Body2 secondary>{moment(Date.now() - 1000 * 600).fromNow()}</Body2>
      </View>
    </Button>
  );
};

export default Rooms;
