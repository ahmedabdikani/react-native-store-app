import * as React from "react";

import { View } from "../../components/theme";
import { Sizes } from "../../constants/Styles";
import { useAuthContext } from "../../context/AuthContext";
import useThemeColor from "../../hooks/useThemeColor";
import Button from "../../components/button/Button";
import { H3 } from "../../components/typography";

const padding = Sizes.base;

interface ISettingsProps {}

const Settings = ({}: ISettingsProps) => {
  const backgroundColor = useThemeColor({}, "card");
  const { signOut } = useAuthContext();

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Button
        onPress={async () => {
          signOut();
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: padding,
          backgroundColor,
        }}
      >
        <H3>Log out</H3>
      </Button>
    </View>
  );
};
export default Settings;
