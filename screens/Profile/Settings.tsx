import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Text, useThemeColor, View } from "../../components/Themed";
import { tintColorLight } from "../../constants/Colors";
import { Fonts, Sizes } from "../../constants/Styles";
import { useAuthContext } from "../../context/AuthContext";

const padding = Sizes.base;

interface ISettingsProps {}

const Settings = ({}: ISettingsProps) => {
  const backgroundColor = useThemeColor({}, "card");
  const { signOut } = useAuthContext();

  let disabled = false;

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
};
export default Settings;
