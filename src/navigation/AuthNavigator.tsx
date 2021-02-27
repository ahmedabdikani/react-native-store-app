import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Intro from "../screens/auth/Intro";
import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";
import BottomTabNavigator from "./BottomTabNavigator";
import Loading from "../components/Loading";
import { useAuthContext } from "../context/AuthContext";
import { AuthStackPramList } from "src/types/Auth";

const AuthStack = createStackNavigator<AuthStackPramList>();

const AuthNavigator = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthStack.Navigator
      initialRouteName="Intro"
      screenOptions={{ headerShown: false }}
    >
      {!user ? (
        <>
          <AuthStack.Screen name="Intro" component={Intro} />
          <AuthStack.Screen name="SignIn" component={SignIn} />
          <AuthStack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        <AuthStack.Screen name="BottomTab" component={BottomTabNavigator} />
      )}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
