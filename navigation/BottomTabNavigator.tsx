import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  HeaderBackButton,
  Header,
  StackHeaderLeftButtonProps,
} from "@react-navigation/stack";
import * as React from "react";

import Colors, { tintColorLight } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import Home from "../screens/Home";
import {
  BottomTabParamList,
  ChatStackPramList,
  HomeStackPramList,
  ProfileStackPramList,
  TabOneParamList,
  TabTwoParamList,
} from "../types";
import Product from "../screens/Product";
import IoniconsNameType from "@expo/vector-icons/build/Ionicons";
import { Text, useThemeColor, View } from "../components/Themed";
import { color } from "react-native-reanimated";
import HearBeat from "../Icons/HearBeat";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import ShoppingCart from "../screens/ShoppingCart";
import ViewScreen from "../screens/ViewScreen";
import Profile from "../screens/Profile";
import Rooms from "../screens/Rooms";
import Chats from "../screens/Chats";
import Playground from "../screens/Playground";
import Settings from "../screens/Settings";
import Favorites from "../screens/Favorites";
import { Fonts } from "../constants/Styles";
import FollowedStores from "../screens/FollowedStores";
import AddContact from "../screens/AddContact";

// const ahmed extends IoniconsNameType<> = "Dd"
// type pla<d extends >

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeStack"
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <BottomTab.Screen
        name="HomeStack"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return (
                <MaterialCommunityIcons size={30} name="home" color={color} />
              );
            }
            return (
              <MaterialCommunityIcons
                size={30}
                name="home-outline"
                color={color}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Fallowed"
        component={Playground}
        options={{
          tabBarIcon: ({ color }) => <HearBeat color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <TabBarIcon name="chatbubble-ellipses" color={color} />;
            }
            return (
              <TabBarIcon name="chatbubble-ellipses-outline" color={color} />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <TabBarIcon name="cart" color={color} />;
            }

            return <TabBarIcon name="cart-outline" color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Me"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <MaterialIcons name="person" color={color} size={30} />;
            }
            return (
              <MaterialIcons name="person-outline" color={color} size={30} />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

const CustomTabButton = ({
  children,
  accessibilityState,
  onPress,
  ...props
}: BottomTabBarButtonProps) => {
  if (accessibilityState?.selected) {
    return (
      <View
        {...props}
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            top: 0,
          }}
        >
          <Svg width={75} height={61} viewBox="0 0 75 61" fill="none">
            <Path d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z" />
          </Svg>
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            elevation: 2,
            zIndex: 2,
            borderRadius: 50,
            height: 50,
            width: 50,
            backgroundColor: "#fff",
            top: -22,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View {...props}>
        <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
      </View>
    );
  }
};
// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
    </TabOneStack.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeStackPramList>();
const ChatStack = createStackNavigator<ChatStackPramList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: "Home", headerShown: false }}
      />
      <HomeStack.Screen
        name="ViewContent"
        component={ViewScreen}
        options={{ headerTitle: "Home", headerShown: false }}
      />
      <HomeStack.Screen
        name="Product"
        component={Product}
        options={{
          headerLeft: (props) => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,.4)",
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  marginLeft: 20,
                }}
              >
                {HeaderBackButton(props)}
              </View>
            );
          },
          headerTitle: "Product",
          headerTitleStyle: { display: "none" },
          headerTintColor: "#fff",
        }}
      />
    </HomeStack.Navigator>
  );
};

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
          title: "Asma",
          headerRight: () => (
            <Ionicons size={24} name={"ellipsis-vertical"} color={color} />
          ),
        }}
      />
      <ChatStack.Screen
        name="AddContact"
        component={AddContact}
        options={{
          headerTitleAlign: "center",
          title: "AddContact",
          headerShown: false,
        }}
      />
    </ChatStack.Navigator>
  );
};

const ProfileStack = createStackNavigator<ProfileStackPramList>();

const ProfileNavigator = () => {
  const color = useThemeColor({}, "text");

  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
        }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Settings",
        }}
      />
      <ProfileStack.Screen
        name="Favorite"
        component={Favorites}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          // title: "Favorites",
          headerTitle: ({ style, allowFontScaling }) => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="star-o" size={24} color={tintColorLight} />
              <Text
                allowFontScaling={allowFontScaling}
                style={{ ...Fonts.h3, marginLeft: 10 }}
              >
                Favorites
              </Text>
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="FollowedStores"
        component={FollowedStores}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          title: "Stores",
        }}
      />
    </ProfileStack.Navigator>
  );
};

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}
