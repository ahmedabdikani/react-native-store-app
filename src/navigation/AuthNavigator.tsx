import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Intro from "../screens/auth/Intro";
import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Intro"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Intro" component={Intro} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
