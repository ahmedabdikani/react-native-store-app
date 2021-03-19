import * as React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { View } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { tintColorLight } from "../../constants/Colors";
import { Sizes, Styles } from "../../constants/Styles";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { ChatScreenProps } from "../../types/Chat";
import { useChatContext } from "../../context/ChatContext";
import MessageList from "../../components/chat/MessageList";
import FileUpload from "../../components/chat/FileUpload";
import { Subtitle1 } from "../../components/typography";

const padding = Sizes.base;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
interface ChatsProps extends ChatScreenProps<"Chat"> {}

const Chats: React.FC<ChatsProps> = ({ navigation, route }) => {
  const [openFileUpload, setOpenFileUpload] = React.useState(false);
  const { item } = route.params;
  const { createMessage, chats, getChat } = useChatContext();

  React.useEffect(() => {
    navigation.setOptions({ title: item.name });
    console.log(item.chat_id);
    getChat(item?.chat_id);
  }, [item]);

  const onSend = (value: string) => {
    if (!value.trim()) {
      return;
    }
    const message = { type: "text", value };

    createMessage(message, item.room_id, item?.chat_id);
  };

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
      <MessageList chats={chats} room={item} />
      <Footer onSend={onSend} setOpenFileUpload={setOpenFileUpload} />
      {openFileUpload && <FileUpload />}
    </View>
  );
};

interface FooterProps {
  setOpenFileUpload: SetState<boolean>;
  onSend: (value: string) => void;
}
const Footer = ({ setOpenFileUpload, onSend }: FooterProps) => {
  const color = useThemeColor({}, "textSecondary");
  const [value, setValue] = React.useState("");
  return (
    <View
      card
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
          value={value}
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
            ...Styles.centerHV,
            width: 30,
            height: 30,
            borderRadius: padding * 2,
            backgroundColor: tintColorLight,
          }}
          onPress={() => setOpenFileUpload((prev) => !prev)}
        >
          <Ionicons name="add" color={"#fff"} size={24} />
        </Button>
      ) : (
        <Button
          onPress={() => {
            onSend(value);
            setValue("");
          }}
        >
          <Subtitle1>Send</Subtitle1>
        </Button>
      )}
    </View>
  );
};

export default Chats;
