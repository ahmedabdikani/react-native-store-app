import * as React from "react";
import { StyleSheet } from "react-native";

import CardView from "../theme/Card";
import { Sizes, Styles } from "../../constants/Styles";
import InputControlled, { InputControlledProps } from "./InputControlled";

const spacing = Sizes.base;

interface InputFormProps extends InputControlledProps {
  left?: () => JSX.Element;
  right?: () => JSX.Element;
}

const InputForm: React.FC<InputFormProps> = ({ left, right, ...props }) => {
  return (
    <CardView style={styles.inputContainer}>
      {left && left()}
      <InputControlled {...props} />
      {right && right()}
    </CardView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    elevation: 10,
    padding: spacing,
    marginBottom: spacing,
    paddingVertical: spacing * 1.2,
    borderRadius: spacing * 3,
    paddingLeft: spacing * 2,
    ...Styles.centerH,
    ...Styles.fRow,
  },
});

export default InputForm;
