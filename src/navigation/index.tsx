import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ColorSchemeName } from "react-native";
import { enableScreens } from "react-native-screens";

import LinkingConfiguration from "./LinkingConfiguration";
import Colors from "../constants/Colors";
import RootNavigator from "./RootNavigator";

enableScreens();

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

export default Navigation;
