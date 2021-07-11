import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BottomTabParamList } from "../types/navigation";
import ProfileNavigator from "./ProfileNavigator";
import HomeNavigator from "./HomeNavigator";
import ChatNavigator from "./ChatNavigator";
import CartNavigator from "./CartNavigator";
import HearBeat from "../Icons/HearBeat";
import Playground from "../screens/playground/Playground";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
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
        // getComponent={() => require("./HomeNavigator").default}
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
        name="Playground"
        component={Playground}
        options={{
          tabBarIcon: ({ color }) => <HearBeat color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ChatStack"
        component={ChatNavigator}
        // getComponent={() => require("./ChatNavigator").default}
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
        // getComponent={() => require("./CartNavigator").default}
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
        // getComponent={() => require("./ProfileNavigator").default}
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
};

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

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default BottomTabNavigator;
