import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Google from "expo-google-app-auth";
import AsyncStorge from "@react-native-async-storage/async-storage";

import { useUserContext } from "../Context/User";
import { Text, TextSec, useThemeColor, View } from "../components/Themed";
import { tintColorLight } from "../constants/Colors";
import { Fonts, Sizes } from "../constants/Styles";
import firebaseConfig from "../firebaseConfig";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import user from "../Types/User";

const padding = Sizes.base;

interface IAuthStackProps {}

const Login = ({ navigation }) => {
  const backgroundColor = useThemeColor({}, "card");

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TouchableOpacity
        style={{
          backgroundColor,
          margin: padding,
          alignItems: "center",
          paddingVertical: padding * 2,
          borderRadius: padding,
        }}
      >
        <Text style={Fonts.h3}>Login</Text>
      </TouchableOpacity>

      <View
        style={{
          alignItems: "flex-end",
          margin: padding,
          marginRight: padding * 2,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <TextSec>Not a user? </TextSec>
          <Text style={{ color: tintColorLight }}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SignUp = ({ navigation }) => {
  const { setUser } = useUserContext();

  const googleSignup = async () => {
    try {
      const res = await Google.logInAsync({
        androidClientId:
          "143103133078-hncrm5v1nhc8v7meal2prpt1fr8uhfh3.apps.googleusercontent.com",
        iosClientId:
          "143103133078-audsc1t4dt95tgsg9lv8kevfbdb7h06l.apps.googleusercontent.com",
      });

      if (res.type === "success") {
        const { email, id, name, photoUrl } = res.user;

        const currentUser = {
          id,
          email,
          name,
          photo: photoUrl,
          password: "1234",
        };

        await AsyncStorge.setItem("user", JSON.stringify(currentUser));
        setUser(currentUser);
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const backgroundColor = useThemeColor({}, "card");
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TouchableOpacity
        style={{
          backgroundColor: "#5890FF",
          margin: padding,
          alignItems: "center",
          paddingVertical: padding * 1.5,
          borderRadius: padding,
          elevation: 10,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ ...Fonts.h3, color: "#fff" }}>
          Sign up with Facebook{"  "}
        </Text>
        <FontAwesome name="facebook-f" size={24} color={"#fff"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={googleSignup}
        style={{
          backgroundColor: "#dd4b39",
          margin: padding,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: padding * 1.5,
          borderRadius: padding,
          flexDirection: "row",
          elevation: 10,
        }}
      >
        <Text style={{ ...Fonts.h3, color: "#fff" }}>
          Sign up with Google{"  "}
        </Text>
        <Ionicons name="logo-google" size={24} color={"#fff"} />
      </TouchableOpacity>

      <View
        style={{
          alignItems: "flex-end",
          margin: padding,
          marginRight: padding * 2,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ flexDirection: "row" }}
        >
          <TextSec>Go to </TextSec>
          <Text style={{ color: tintColorLight }}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AuthStack = createStackNavigator();

const AuthNavigator = ({}: IAuthStackProps) => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
