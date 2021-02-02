import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as React from "react";
import { CardView, Text, useThemeColor, View } from "../components/Themed";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fonts, Sizes } from "../constants/Styles";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useChatContext } from "../Context/ChatContext";

interface IAddContactProps {}

const padding = Sizes.base;
const schema = yup.object().shape({
  name: yup.string().trim().required("empty"),
});

const AddContact = ({}: IAddContactProps) => {
  const navigation = useNavigation();
  const card = useThemeColor({}, "card");
  const { top } = useSafeAreaInsets();
  const { searchUser } = useChatContext();
  const backgroundColor = useThemeColor({}, "background");
  const color = useThemeColor({}, "text");
  const { control, errors, handleSubmit } = useForm<{ name: string }>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (name) => {
    searchUser(name);
  };

  React.useEffect(() => {
    navigation.dangerouslyGetParent()?.setOptions({ tabBarVisible: false });
    return () => {
      navigation.dangerouslyGetParent()?.setOptions({ tabBarVisible: true });
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1, paddingTop: top + padding, padding }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CardView
          style={{
            borderRadius: padding,
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Controller
            control={control}
            render={({ onChange, value }) => {
              return (
                <TextInput
                  onChangeText={(value) => onChange(value)}
                  placeholder={"Search an account"}
                  placeholderTextColor={"#666"}
                  style={{ ...Fonts.body2, flex: 1, padding, color }}
                  value={value}
                />
              );
            }}
            name="name"
            defaultValue=""
          />
        </CardView>

        <Pressable
          onPress={handleSubmit(onSubmit)}
          style={({ pressed }) => ({
            opacity: pressed || errors.name ? 0.3 : 1,
            marginLeft: padding,
          })}
        >
          <Text style={Fonts.h3}>Search</Text>
        </Pressable>
      </View>
      {errors.name && (
        <Text style={{ alignSelf: "center", ...Fonts.body2 }}>
          {errors.name.message}
        </Text>
      )}
    </View>
  );
};
export default AddContact;
