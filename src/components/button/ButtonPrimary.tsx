import * as React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";

import Button from "./Button";
import { tintColorLight } from "../../constants/Colors";
import { Sizes } from "../../constants/Styles";
import TextButton from "../typography/TextButton";

const spacing = Sizes.base;

interface ButtonPrimaryProps {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  text: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ onPress, text }) => {
  return (
    <Button style={styles.btn} onPress={onPress}>
      <TextButton style={styles.text} numberOfLines={1}>
        {text}
      </TextButton>
    </Button>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: spacing * 2,
    paddingVertical: spacing,
    backgroundColor: tintColorLight,
    borderRadius: spacing,
  },
  text: {
    color: "#fff",
  },
});

export default ButtonPrimary;
