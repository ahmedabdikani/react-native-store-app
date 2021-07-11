import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import useThemeColor from "../hooks/useThemeColor";
import Camera from "../screens/chat/Camera";
import Chats from "../screens/chat/Chats";
import Contacts from "../screens/chat/Contacts";
import Rooms from "../screens/chat/Rooms";
import { ChatStackPramList } from "../types/navigation";

const ChatStack = createStackNavigator<ChatStackPramList>();
const ChatNavigator = () => {
  const color = useThemeColor({}, "text");

  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Rooms"
        component={Rooms}
        options={{
          headerShown: false,
          title: "Chats",
          headerRight: () => <Ionicons color={color} name={"add"} size={24} />,
        }}
      />
      <ChatStack.Screen
        name="Chat"
        component={Chats}
        options={{
          headerTitleAlign: "center",
          headerRight: () => (
            <Ionicons size={24} name={"ellipsis-vertical"} color={color} />
          ),
        }}
      />
      <ChatStack.Screen
        name="Camera"
        component={Camera}
        options={{
          headerTransparent: true,
          headerTitleAlign: "center",
          headerTitle: "Camera",
        }}
      />
      <ChatStack.Screen
        name="Contacts"
        component={Contacts}
        options={{
          headerTitleAlign: "center",
          title: "AddContact",
        }}
      />
    </ChatStack.Navigator>
  );
};

export default ChatNavigator;
