import React from "react";
import { Platform } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import BackButtonNative from "../components/button/BackButtonNative";
import Center from "../components/center/Center";
import { View } from "../components/theme";
import useThemeColor from "../hooks/useThemeColor";
import Home from "../screens/home/Home";
import Product from "../screens/home/Product";
import { HomeStackPramList } from "../types/Home";

const circleHieght = 40;
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
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="Product"
        component={Product}
        sharedElementsConfig={(route, otherRoute, showing) => {
          if (!showing && Platform.OS === "android") {
            return undefined;
          }
          return [
            {
              id: route.params.product.id.toString(),
              animation: "fade",
            },
          ];
        }}
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

export default HomeNavigator;
