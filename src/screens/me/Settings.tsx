import React, { useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

import { View } from "../../components/theme";
import { Sizes } from "../../constants/Styles";
import { useAuthContext } from "../../context/auth/AuthContext";
import useThemeColor from "../../hooks/useThemeColor";
import Button from "../../components/button/Button";
import { ButtonText, Subtitle1 } from "../../components/typography";
import { useLanguage } from "../../context/language/LanguageContex";
import Center from "../../components/center/Center";
import useHideBottomBar from "../../hooks/useHideBottomBar";
import { ProfileScreenProps } from "../../types/Profile";

const padding = Sizes.spacing.s;

interface SettingsProps extends ProfileScreenProps<"Settings"> {}

const Settings = ({ navigation }: SettingsProps) => {
  const { signOut } = useAuthContext();
  const color = useThemeColor({}, "text");
  const { changeLanguage, selectedLanguage } = useLanguage();

  useEffect(() => {
    const unsupscribe = useHideBottomBar(navigation.dangerouslyGetParent());
    return () => {
      unsupscribe && unsupscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1, padding }}>
      <Subtitle1>Do not Disturb</Subtitle1>
      <Subtitle1>General</Subtitle1>
      <Subtitle1>About</Subtitle1>

      <View
        row
        style={{
          alignItems: "center",
        }}
      >
        <Subtitle1>language </Subtitle1>
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue);
              changeLanguage(itemValue as typeof selectedLanguage);
            }}
            itemStyle={{ color }}
            dropdownIconColor={color}
            style={{ color }}
          >
            <Picker.Item label={"english"} value="english" />
            <Picker.Item label="somali" value="somali" />
          </Picker>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
      <View card row>
        <Center>
          <Button
            onPress={async () => {
              signOut();
            }}
            style={{
              marginVertical: padding,
            }}
          >
            <ButtonText style={{ fontSize: 18 }}>Log out</ButtonText>
          </Button>
        </Center>
      </View>
    </View>
  );
};
export default Settings;
