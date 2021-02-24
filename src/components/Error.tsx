import * as React from "react";
import { StyleSheet, Text } from "react-native";

import { Fonts } from "../constants/Styles";

interface IErrorProps {
  error: string | undefined;
}

const Error: React.FC<IErrorProps> = ({ error }: IErrorProps) => {
  return error ? <Text style={styles.text}>{error}</Text> : null;
};

const styles = StyleSheet.create({
  text: { ...Fonts.h3, color: "#df4759" },
});

export default Error;
