import * as React from "react";
import { StyleSheet } from "react-native";
import { FieldError } from "react-hook-form";

import { Sizes, Styles } from "../../constants/Styles";
import InputControlled, { InputControlledProps } from "./InputControlled";
import Error from "../Error";
import View from "../theme/View";

const spacing = Sizes.base;

interface InputFormProps extends InputControlledProps {
  left?: () => JSX.Element;
  right?: () => JSX.Element;
  error: FieldError | undefined;
}

const InputForm: React.FC<InputFormProps> = ({
  error,
  left,
  right,
  ...props
}) => {
  return (
    <View transparent style={{ marginVertical: spacing }}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: "#df4759",
            borderWidth: error ? 1 : 0,
          },
        ]}
      >
        {left && left()}
        <InputControlled {...props} />
        {right && right()}
      </View>
      <View transparent style={{ marginLeft: spacing }}>
        <Error error={error?.message} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // elevation: 10,
    padding: spacing,
    borderRadius: spacing * 2,
    paddingLeft: spacing * 2,
    ...Styles.centerH,
    ...Styles.fRow,
  },
});

export default InputForm;
