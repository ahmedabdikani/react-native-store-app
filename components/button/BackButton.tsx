import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Platform } from "react-native";
import Button from "./Button";

import useThemeColor from "../../hooks/useThemeColor";

interface IBackButtonProps {
  children: (color: string) => JSX.Element;
}

export const BackButton: React.FC<IBackButtonProps> = ({ children }) => {
  const color = useThemeColor({}, "text");
  const navigation = useNavigation();

  return <Button onPress={() => navigation.goBack()}>{children(color)}</Button>;
};

export const BackButtonIos: React.FC = () => {
  return (
    <BackButton>
      {(color: string) => {
        return <Ionicons name="ios-chevron-back" size={24} color={color} />;
      }}
    </BackButton>
  );
};

export const BackButtonAndroid: React.FC = () => {
  return (
    <BackButton>
      {(color: string) => {
        return <Ionicons name="arrow-back" size={24} color={color} />;
      }}
    </BackButton>
  );
};

export const BackButtonNative: React.FC = () =>
  Platform.OS === "android" ? <BackButtonAndroid /> : <BackButtonIos />;
