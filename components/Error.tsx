import * as React from "react";
import { Text } from "react-native";

import { Fonts } from "../constants/Styles";

interface IErrorProps {
  error: string | undefined;
}

const Error: React.FC<IErrorProps> = ({ error }: IErrorProps) => {
  return <Text style={{ ...Fonts.body2, color: "#df4759" }}>{error}</Text>;
};
export default Error;
