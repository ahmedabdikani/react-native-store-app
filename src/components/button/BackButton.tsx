import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";

import useThemeColor from "../../hooks/useThemeColor";

interface IBackButtonProps {
  children: (color: string) => JSX.Element;
}

const BackButton: React.FC<IBackButtonProps> = ({ children }) => {
  const color = useThemeColor({}, "text");
  const navigation = useNavigation();

  return <Button onPress={() => navigation.goBack()}>{children(color)}</Button>;
};

export default BackButton;
