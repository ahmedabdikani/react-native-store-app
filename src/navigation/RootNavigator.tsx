import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NotFoundScreen from "../screens/notFound/NotFoundScreen";
import { RootStackParamList } from "../types";
import AuthStack from "./AuthNavigator";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName={"Auth"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
