import * as React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Avatar from "../../components/Avatar";
import { CardView, Text, View } from "../../components/Theme";
import useThemeColor from "../../hooks/useThemeColor";
import { tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Fonts, Sizes } from "../../constants/Styles";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { ChatNavigationProp } from "../../types/Chat";

const padding = Sizes.base;
const { height } = Layout.window;

interface ChatsProps extends ChatNavigationProp<"Chat"> {}

const Chats: React.FC<ChatsProps> = ({ navigation }) => {
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

interface FooterProps {
  setOpenFileUpload: React.Dispatch<React.SetStateAction<boolean>>;
}
const Footer = ({ setOpenFileUpload }: FooterProps) => {
  const [value, setValue] = React.useState("");
  const color = useThemeColor({}, "textSecondary");
  return (
    <CardView
      style={{
        flexDirection: "row",
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
        <Input
          placeholder={"Type here..."}
          onChangeText={(value) => {
            setValue(value);
            setOpenFileUpload(false);
          }}
        />
        <MaterialCommunityIcons
          name="emoticon-happy-outline"
          size={24}
          color={color}
        />
      </View>

      {!value.length ? (
        <Button
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 30,
            height: 30,
            borderRadius: padding * 2,
            backgroundColor: tintColorLight,
          }}
          onPress={() => setOpenFileUpload((prev) => !prev)}
        >
          <Ionicons name="add" color={color} size={24} />
        </Button>
      ) : (
        <Button>
          <Text style={Fonts.body2}>Send</Text>
        </Button>
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

const AudioMessage = () => null;
const VideoMessage = () => null;

export default Chats;
