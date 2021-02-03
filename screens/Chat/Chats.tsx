import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { useState } from "react";
import { TextInput, Keyboard, Pressable } from "react-native";
import { color } from "react-native-reanimated";
import Avatar from "../../components/Avatar";

import { CardView, Text, useThemeColor, View } from "../../components/Themed";
import { tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Fonts, Sizes } from "../../constants/Styles";

const padding = Sizes.base;
const { width, height } = Layout.window;

interface IChatsProps {}

const Chats: React.FC = ({ navigation }: IChatsProps) => {
  const [openFileUpload, setOpenFileUpload] = React.useState(false);

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
      <Footer setOpenFileUpload={setOpenFileUpload} />
      {openFileUpload && <FileUpload setOpenFileUpload={setOpenFileUpload} />}
    </View>
  );
};

const Footer = ({ setOpenFileUpload }) => {
  const [value, setValue] = useState<string>("");
  const color = useThemeColor({}, "text");
  return (
    <CardView
      style={{
        flexDirection: "row",
        // position: "absolute",
        // bottom: 0,
        // marginBottom: padding,
        padding,
        alignItems: "center",
      }}
    >
      <View
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
          value={value}
          onChangeText={(value) => {
            setValue(value);
            setOpenFileUpload(false);
          }}
        />
        <MaterialCommunityIcons
          name="emoticon-happy-outline"
          size={24}
          color="#ccc"
        />
      </View>

      {!value.length ? (
        <Pressable
          style={() => ({
            justifyContent: "center",
            alignItems: "center",
            // padding: padding * 0.5,
            width: 30,
            height: 30,
            borderRadius: padding * 2,
            backgroundColor: tintColorLight,
          })}
          onPress={() => setOpenFileUpload((prev) => !prev)}
        >
          <Ionicons name="add" color={"#fff"} size={24} />
        </Pressable>
      ) : (
        <Pressable onPress={() => null}>
          <Text style={Fonts.body2}>Send</Text>
        </Pressable>
      )}
    </CardView>
  );
};

const FileUpload = ({
  setOpenFileUpload,
}: {
  setOpenFileUpload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <CardView
      style={{
        height: height * 0.4,
        flexDirection: "row",
        flexWrap: "wrap",
        padding,
        alignItems: "center",
      }}
    >
      <Button>
        <MaterialCommunityIcons name="image" size={35} color={"#fff"} />
      </Button>
      <Button>
        <MaterialCommunityIcons name="camera" size={35} color={"#fff"} />
      </Button>
      <Button>
        <MaterialCommunityIcons name="map-marker" size={35} color={"#fff"} />
      </Button>
    </CardView>
  );
};

const Button: React.FC = ({ children }) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.2 : 1,
        width: 70,
        borderRadius: padding,
        marginLeft: padding,
        height: 70,
        backgroundColor: "rgba(255,255,255,.1)",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      {children}
    </Pressable>
  );
};

const Messages = () => {
  return (
    <View style={{ flex: 1 }}>
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
