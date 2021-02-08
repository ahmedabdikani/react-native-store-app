import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as React from "react";
import { CardView, Text, useThemeColor, View } from "../../components/Themed";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fonts, Sizes } from "../../constants/Styles";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useChatContext } from "../../context/ChatContext";
import { useState } from "react";
import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../context/AuthContext";

interface IAddContactProps {}

const padding = Sizes.base;
const schema = yup.object().shape({
  name: yup.string().trim().required("empty"),
});

const AddContact = ({}: IAddContactProps) => {
  const [searchResult, setSearchResult] = useState([]);
  const navigation = useNavigation();
  const card = useThemeColor({}, "card");
  const { user } = useAuthContext();
  const { top } = useSafeAreaInsets();
  const { searchUser } = useChatContext();
  const backgroundColor = useThemeColor({}, "background");
  const color = useThemeColor({}, "text");
  const { control, errors, handleSubmit } = useForm<{ name: string }>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async ({ name }: { name: string }) => {
    try {
      const searchResult = await searchUser(name);
      setSearchResult(searchResult);
    } catch (error) {
      console.log(error);
    }
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
      {/* {errors.name && (
        <Text style={{ alignSelf: "center", ...Fonts.body2 }}>
          {errors.name.message}
        </Text>
      )} */}

      <SearchUserList
        currentUser={user}
        users={searchResult}
        secondaryColor={card}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

const SearchUserList = ({
  users,
  backgroundColor,
  secondaryColor,
  currentUser,
}) => {
  const isFriend = (user) => {
    return currentUser;
  };

  return (
    <View
      style={{
        marginTop: padding,
        backgroundColor: secondaryColor,
        borderRadius: padding,
        overflow: "hidden",
      }}
    >
      {users?.map((user, index) => (
        <SearchUserItem
          isFriend={isFriend(user)}
          key={user.id}
          user={user}
          backgroundColor={backgroundColor}
          last={users.length - 1 === index}
        />
      ))}
    </View>
  );
};

const SearchUserItem = ({ user, last, backgroundColor }) => {
  return (
    <CardView>
      <Pressable
        style={({ pressed }) => ({
          opacity: pressed ? 0.3 : 1,
          flexDirection: "row",
          // marginBottom: padding,
          alignItems: "center",
          padding,
        })}
      >
        <Avatar
          imageUri={user.imageUri}
          initial={user.name}
          backgroundColor={backgroundColor}
        />
        <Text style={{ ...Fonts.h3, marginLeft: padding }}>{user.name}</Text>
      </Pressable>
      <View
        style={{
          borderBottomColor: backgroundColor,
          borderBottomWidth: last ? 0 : 1,
        }}
      />
    </CardView>
  );
};

export default AddContact;
