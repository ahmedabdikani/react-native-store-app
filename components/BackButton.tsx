import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import Button from "./Button";

import { useThemeColor } from "./Themed";

interface IBackButtonProps {}

export const BackButton: React.FC<IBackButtonProps> = ({ children }) => {
  const color = useThemeColor({}, "text");
  const navigation = useNavigation();

  return <Button onPress={() => navigation.goBack()}>children(color)</Button>;
};

export const IosBackButton: React.FC = () => {
  return (
    <BackButton>
      {(color: string) => {
        return <Ionicons name="ios-chevron-back" size={24} color={color} />;
      }}
    </BackButton>
  );
};

export const AndroidBackButton: React.FC = () => {
  return (
    <BackButton>
      {(color: string) => {
        return <Ionicons name="arrow-back" size={24} color={color} />;
      }}
    </BackButton>
  );
};
