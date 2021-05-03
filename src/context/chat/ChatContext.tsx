import { useState, useEffect } from "react";
import * as React from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { RealtimeSubscription } from "@supabase/realtime-js";

import "react-native-url-polyfill/auto";

import supabase from "../../config/supabase";
import { Chat } from "../../types/Chat";
import User from "../../types/User";
import { useAuthContext } from "../auth/AuthContext";

type CallBack = <T>(data: unknown[] | null, error: T) => void;

interface Context {
  chats: Chat[];
  rooms: any[];
  createRoom: (friend: User) => void;
  createMessage: (
    message: Object,
    roomId: string,
    chatId: string,
    pushToken: string
  ) => void;
  getChat: (chatId: string) => void;
  searchUser: (name: string, callBack: CallBack) => Promise<void>;
}

const ChatContext = React.createContext<Context>({} as Context);

export const useChatContext = () => {
  return React.useContext(ChatContext);
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification(message: any) {
  // await Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: "You've got mail! 📬",
  //     body: "Here is the notification body",
  //     data: { data: "goes here" },
  //   },
  //   trigger: { seconds: 2 },
  // });
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POst",
    headers: {
      host: "exp.host",
      accept: "application/json",
      "accept-encoding": "gzip, deflate",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      to: message.pushToken,
      sound: "default",
      title: message.name,
      body: message.value,
    }),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      throw new Error("Failed to get push token for push notification!");
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    throw new Error("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}
export const ChatProvier: React.FC = ({ children }) => {
  const [rooms, setRooms] = useState<any>([]);
  const [chats, setChats] = useState<any>([]);
  const { user, updateUser } = useAuthContext();

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync()
        .then((token) => {
          updateUser({ pushToken: token });
        })
        .catch((error) =>
          console.log("push notification error: ", error.message)
        );
    }
  }, []);

  useEffect(() => {
    let subscription: RealtimeSubscription;
    if (user) {
      supabase
        .from("chats_v")
        .select("*")
        .eq("user_id", user?.id)
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
          }
          if (data) {
            setRooms(data);
          }
        });

      subscription = supabase
        .from(`chats`)
        .on("*", (payload) => {
          supabase
            .from("chats_v")
            .select("*")
            .eq("user_id", user?.id)
            .then(({ data, error }) => {
              if (error) {
                console.log(error);
              }
              if (data) {
                setRooms(data);
              }
            });
        })
        .subscribe();
    }
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [user]);

  const searchUser = async (name: string, callBack: CallBack) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .like("name", `%${name}%`);
    callBack(data, error);
  };

  const createMessage = async (
    message: any,
    roomId: string,
    chatId: string,
    pushToken: string
  ) => {
    try {
      const { error, data } = await supabase
        .from("messages")
        .insert({ chat_id: chatId, sent_by: user?.id, ...message })
        .single();

      if (error) {
        throw error;
      }
      if (data) {
        await supabase
          .from("chats")
          .update({ last_message_id: data?.id })
          .match({ room_id: roomId });
        await schedulePushNotification({
          name: user?.name,
          value: message?.value,
          pushToken,
        })
          .catch((error) => console.log(error))
          .then(() => console.log("sent"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createRoom = async (friend: User) => {
    try {
      const { data, error } = await supabase.from("rooms").insert({}).single();
      console.log(data);
      console.log("error: ", error);
      if (data) {
        await supabase.from("members").insert([
          { user_id: user?.id, room_id: data?.id },
          { user_id: friend?.id, room_id: data?.id },
        ]);
        await supabase.from("chats").insert({ room_id: data?.id });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getChat = async (chatId: string) => {
    try {
      const { data, error } = await supabase
        .from("messages_v")
        .select("*")
        .eq("chat_id", chatId);
      // console.log(data);

      console.log(error);
      if (data) {
        setChats(data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        rooms,
        searchUser,
        getChat,
        createRoom,
        createMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
