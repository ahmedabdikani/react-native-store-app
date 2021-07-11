import React from "react";
import { Platform } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import {
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";

import Home from "../screens/home/Home";
import Product from "../screens/home/Product";
import Comments from "../screens/home/Comments";
import { View } from "../components/theme";
import useThemeColor from "../hooks/useThemeColor";
import Center from "../components/center/Center";
import BackButtonNative from "../components/button/BackButtonNative";
import { HomeStackPramList } from "../types/navigation";

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
        transitionSpec: {
          close: TransitionSpecs.TransitionIOSSpec,
          open: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      headerMode={"screen"}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="Comments"
        component={Comments}
        options={{ headerShown: true }}
      />
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
