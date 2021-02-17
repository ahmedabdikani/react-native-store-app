import * as React from "react";

import { Text, View } from "../../components/Theme";
import { Fonts, Sizes } from "../../constants/Styles";
import { useAuthContext } from "../../context/AuthContext";
import useThemeColor from "../../hooks/useThemeColor";
import Button from "../../components/button/Button";

const padding = Sizes.base;

interface ISettingsProps {}

const Settings = ({}: ISettingsProps) => {
  const backgroundColor = useThemeColor({}, "card");
  const { signOut } = useAuthContext();

  let disabled = false;

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Button
        disabled={disabled}
        onPress={async () => {
          disabled = true;
          signOut();
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: padding * 2,
          marginVertical: padding,
          backgroundColor,
        }}
      >
        <Text style={{ ...Fonts.h3 }}>Log out</Text>
      </Button>
    </View>
  );
};
export default Settings;
