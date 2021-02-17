import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ColorSchemeName } from "react-native";

import Loading from "../components/Loading";
import NotFoundScreen from "../screens/notFound/NotFoundScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Colors from "../constants/Colors";
import AuthStack from "./AuthNavigator";
import { useAuthContext } from "../context/AuthContext";
import BottomTabNavigator from "./BottomTabNavigator";

interface NAvigationProps {
  colorScheme: ColorSchemeName;
}

const Navigation: React.FC<NAvigationProps> = ({ colorScheme }) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? Colors.dark : Colors.light}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = ({}) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  });

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
