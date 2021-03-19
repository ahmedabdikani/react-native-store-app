import * as React from "react";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { tintColorLight } from "../constants/Colors";
import Home from "../screens/home/Home";
import Product from "../screens/home/Product";
import useThemeColor from "../hooks/useThemeColor";
import { Text, View } from "../components/theme";
import Center from "../components/center/Center";
import HearBeat from "../Icons/HearBeat";
import Cart from "../screens/cart/Cart";
import Me from "../screens/me/Me";
import Rooms from "../screens/chat/Rooms";
import Chats from "../screens/chat/Chats";
import Playground from "../screens/Playground";
import Settings from "../screens/me/Settings";
import Favorites from "../screens/me/Favorites";
import { Fonts } from "../constants/Styles";
import FollowedStores from "../screens/me/FollowedStores";
import AddContact from "../screens/chat/Contacts";
import { CartStackPramList } from "../types/Cart";
import BackButtonNative from "../components/button/BackButtonNative";
import { ChatStackPramList } from "../types/Chat";
import { BottomTabParamList } from "../types/BottomTab";
import { HomeStackPramList } from "../types/Home";
import { ProfileStackPramList } from "../types/Profile";
import Camera from "../screens/chat/Camera";
import Profile from "../screens/me/Profile";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
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
        name="ChatStack"
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
        name="CartStack"
        component={CartNavigator}
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
        name="ProfileStack"
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

// const CustomTabButton = ({
//   children,
//   accessibilityState,
//   onPress,
//   ...props
// }: BottomTabBarButtonProps) => {
//   if (accessibilityState?.selected) {
//     return (
//       <View
//         {...props}
//         style={{
//           justifyContent: "center",
//           alignItems: "center",
//           flex: 1,
//           backgroundColor: "transparent",
//         }}
//       >
//         <View
//           style={{
//             backgroundColor: "transparent",
//             position: "absolute",
//             top: 0,
//           }}
//         >
//           <Svg width={75} height={61} viewBox="0 0 75 61" fill="none">
//             <Path d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z" />
//           </Svg>
//         </View>
//         <TouchableOpacity
//           onPress={onPress}
//           style={{
//             elevation: 2,
//             zIndex: 2,
//             borderRadius: 50,
//             height: 50,
//             width: 50,
//             backgroundColor: "#fff",
//             top: -22,
//             justifyContent: "center",
//             alignItems: "center",
//             paddingVertical: 10,
//           }}
//         >
//           {children}
//         </TouchableOpacity>
//       </View>
//     );
//   } else {
//     return (
//       <View {...props}>
//         <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
//       </View>
//     );
//   }
// };

const circleHieght = 40;

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const HomeStack = createSharedElementStackNavigator<HomeStackPramList>();
const HomeNavigator = () => {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        animationTypeForReplace: "pop",
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: "Home" }}
      />
      <HomeStack.Screen
        name="Product"
        component={Product}
        sharedElementsConfig={(route) => [
          {
            id: route.params.product.id.toString(),
            animation: "fade",
          },
        ]}
        options={{
          headerShown: true,
          headerLeft: (props) => {
            return (
              <View
                style={{
                  backgroundColor,
                  height: circleHieght,
                  width: circleHieght,
                  opacity: 0.8,
                  borderRadius: circleHieght,
                  marginLeft: 10,
                }}
              >
                <Center>
                  <BackButtonNative />
                </Center>
              </View>
            );
          },

          headerTitleStyle: { display: "none" },
          headerBackTitleVisible: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}
      />
    </HomeStack.Navigator>
  );
};
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
        component={AddContact}
        options={{
          headerTitleAlign: "center",
          title: "AddContact",
        }}
      />
    </ChatStack.Navigator>
  );
};
const ProfileStack = createStackNavigator<ProfileStackPramList>();
const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <ProfileStack.Screen
        name="Me"
        component={Me}
        options={{
          title: "Me",
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
        }}
      />
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
        }}
      />
      <ProfileStack.Screen
        name="Favorite"
        component={Favorites}
        options={{
          headerTitle: ({ style, allowFontScaling }) => (
            <View
              transparent
              style={{
                flexDirection: "row",
              }}
            >
              <Center>
                <FontAwesome name="star-o" size={24} color={tintColorLight} />
                <Text
                  allowFontScaling={allowFontScaling}
                  style={{ ...Fonts.h3, marginLeft: 10 }}
                >
                  Favorites
                </Text>
              </Center>
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="FollowedStores"
        component={FollowedStores}
        options={{
          title: "Stores",
        }}
      />
    </ProfileStack.Navigator>
  );
};
const CartStack = createStackNavigator<CartStackPramList>();
const CartNavigator = () => {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          title: "Cart",
        }}
      />
    </CartStack.Navigator>
  );
};
