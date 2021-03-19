import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import { View } from "../../components/theme";
import { Sizes } from "../../constants/Styles";
import { useAuthContext } from "../../context/AuthContext";
import useThemeColor from "../../hooks/useThemeColor";
import Button from "../../components/button/Button";
import { ButtonText, Subtitle1 } from "../../components/typography";
import { useLanguage, Language } from "../../context/LanguageContex";

const padding = Sizes.base;

interface ISettingsProps {}

const Settings = ({}: ISettingsProps) => {
  const { signOut } = useAuthContext();
  const color = useThemeColor({}, "text");
  const { changeLanguage, selectedLanguage } = useLanguage();
  // const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");

  return (
    <View style={{ flex: 1, padding }}>
      <Subtitle1>Do not Disturb</Subtitle1>
      <Subtitle1>General</Subtitle1>
      <Subtitle1>About</Subtitle1>

      <View
        flexR
        style={{
          alignItems: "center",
        }}
      >
        <Subtitle1>language: </Subtitle1>
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue);
              changeLanguage(itemValue);
            }}
            itemStyle={{ color }}
          >
            <Picker.Item label="english" value="english" />
            <Picker.Item label="somali" value="somali" />
          </Picker>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
      <View card>
        <Button
          onPress={async () => {
            signOut();
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: padding,
          }}
        >
          <ButtonText style={{ fontSize: 18 }}>Log out</ButtonText>
        </Button>
      </View>
    </View>
  );
};
export default Settings;
