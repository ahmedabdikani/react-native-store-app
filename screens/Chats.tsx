import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { TextInput, Keyboard } from "react-native";
import { color } from "react-native-reanimated";
import Avatar from "../components/Avatar";

import { CardView, Text, useThemeColor, View } from "../components/Themed";
import { tintColorLight } from "../constants/Colors";
import Layout from "../constants/Layout";
import { Fonts, Sizes } from "../constants/Styles";

const padding = Sizes.base;
const { width, height } = Layout.window;

interface IChatsProps {}

const Chats: React.FC = ({ navigation }: IChatsProps) => {
  React.useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent?.setOptions({
      tabBarVisible: false,
    });
    return () => {
      parent?.setOptions({
        tabBarVisible: true,
      });
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Messages />
      <Footer />
    </View>
  );
};

const Footer = () => {
  const color = useThemeColor({}, "text");
  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        marginBottom: padding,
        padding,
        alignItems: "center",
      }}
    >
      <CardView
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: padding * 2,
          padding: padding * 0.5,
          marginRight: padding,
        }}
      >
        <TextInput
          placeholder={"Type here..."}
          placeholderTextColor={color}
          style={{ flex: 1, ...Fonts.body2, paddingLeft: padding, color }}
        />
        <MaterialCommunityIcons
          name="emoticon-happy-outline"
          size={24}
          color="#ccc"
        />
      </CardView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          // padding: padding * 0.5,
          width: 30,
          height: 30,
          borderRadius: padding * 2,
          backgroundColor: tintColorLight,
        }}
      >
        <Ionicons name="add" color={"#fff"} size={24} />
      </View>
    </View>
  );
};

const Messages = () => {
  return (
    <View>
      <TextMessage reverse />
      <TextMessage />
      <TextMessage reverse />
      <TextMessage />
    </View>
  );
};

const TextMessage = ({ reverse }: { reverse?: boolean }) => {
  return (
    <View
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
        margin: padding,
      }}
    >
      <Avatar
        initial={"ahmed"}
        imageUri={"https://source.unsplash.com/random/2"}
        // backgroundColor={"red"}
      />
      <CardView
        style={{
          marginLeft: reverse ? 0 : padding,
          marginRight: !reverse ? 0 : padding,
          // minWidth: width / 2,
          borderRadius: padding,
          justifyContent: "center",
          // alignItems: reverse ? "flex-end" : "flex-start",
          alignItems: "center",
          padding,
        }}
      >
        <Text style={Fonts.body3}>Hi how are you?</Text>
      </CardView>
    </View>
  );
};

export default Chats;
