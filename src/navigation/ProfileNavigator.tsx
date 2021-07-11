import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import Center from "..//components/center/Center";
import { View } from "..//components/theme";
import { Subtitle1 } from "..//components/typography";
import { tintColorLight } from "..//constants/Colors";
import Favorites from "..//screens/me/Favorites";
import FollowedStores from "..//screens/me/FollowedStores";
import Me from "..//screens/me/Me";
import Profile from "..//screens/me/Profile";
import Settings from "../screens/me/Settings";
import Store from "../screens/me/Store";
import { ProfileStackPramList } from "../types/navigation";
import AddProduct from "../screens/me/CreateProduct";

const ProfileStack = createStackNavigator<ProfileStackPramList>();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      mode={"modal"}
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <ProfileStack.Screen
        name="Me"
        component={Me}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen name="Settings" component={Settings} />
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="AddProduct" component={AddProduct} />
      <ProfileStack.Screen
        name="Store"
        component={Store}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="Favorite"
        component={Favorites}
        options={{
          headerShown: true,
          headerTitle: ({ style, allowFontScaling }) => (
            <View transparent>
              <Center row>
                <FontAwesome name="star-o" size={24} color={tintColorLight} />
                <Subtitle1
                  allowFontScaling={allowFontScaling}
                  style={{ marginLeft: 10 }}
                >
                  Favorites
                </Subtitle1>
              </Center>
            </View>
          ),
        }}
      />
      <ProfileStack.Screen name="FollowedStores" component={FollowedStores} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
