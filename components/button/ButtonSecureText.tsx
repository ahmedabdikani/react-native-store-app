import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

interface ButtonSecureTextProps {
  secureTextEntry: boolean;
  setSecureTextEntry: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonSecureText: React.FC<ButtonSecureTextProps> = ({
  secureTextEntry,
  setSecureTextEntry,
}) => {
  const grey = "#ccc";

  return (
    <Button onPress={() => setSecureTextEntry((prev) => !prev)}>
      {secureTextEntry ? (
        <Ionicons name="eye-off" size={24} color={grey} />
      ) : (
        <Ionicons name="eye" size={24} color={grey} />
      )}
    </Button>
  );
};
export default ButtonSecureText;
