import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Intro from "../screens/auth/Intro";
import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";
import BottomTabNavigator from "./BottomTabNavigator";
import Loading from "../components/Loading";
import { AuthStackPramList } from "../types/Auth";
import { useAuthContext } from "../context/auth/AuthContext";

const AuthStack = createStackNavigator<AuthStackPramList>();

const AuthNavigator = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthStack.Navigator
      initialRouteName="Intro"
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        <>
          <AuthStack.Screen
            name="Intro"
            // getComponent={() => require("../screens/auth/Intro").default}
            component={Intro}
          />
          <AuthStack.Screen
            name="SignIn"
            // getComponent={() => require("../screens/auth/SignIn").default}
            component={SignIn}
          />
          <AuthStack.Screen
            name="SignUp"
            // getComponent={() => require("../screens/auth/SignUp").default}
            component={SignUp}
          />
        </>
      ) : (
        <AuthStack.Screen
          name="BottomTab"
          // getComponent={() => require("./BottomTabNavigator").default}
          component={BottomTabNavigator}
        />
      )}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
