import { createStackNavigator } from "@react-navigation/stack";
import CheckBox from "@react-native-community/checkbox";
import * as React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Google from "expo-google-app-auth";
import AsyncStorge from "@react-native-async-storage/async-storage";
import { GoogleAuthProvider, Auth } from "../config/firebase";
import * as yub from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { useAuthContext } from "../context/AuthContext";
import {
  CardView,
  Text,
  TextSec,
  useThemeColor,
  View,
} from "../components/Themed";
import { tintColorLight } from "../constants/Colors";
import { Fonts, Sizes } from "../constants/Styles";
import firebaseConfig from "../config/firebaseConfig";
import user from "../types/User";
import Layout from "../constants/Layout";
import { UseQueryResult } from "react-query";
import { useState } from "react";
import Logo from "../components/Logo";
import { Pressable } from "react-native";

const padding = Sizes.base;
const { width, height } = Layout.window;
const signInSchema = yub.object().shape({
  email: yub.string().required().email().trim(),
  password: yub.string().required().trim(),
});

const signUpSchema = yub.object().shape({
  name: yub.string().required("Please Enter Name").trim().min(4),
  email: yub.string().required("Please Enter Email").email().trim(),
  password: yub.string().required("Please Enter Password").trim().min(8),
  passwordConform: yub
    .string()
    .required("Please Enter Conform Password")
    .trim()
    .oneOf([yub.ref("password"), null], "Passwords Must Match"),
});

export interface SignUpFormProps extends SignInFormProps {
  name: string;
  passwordConform: string;
}
interface IAuthStackProps {}
export interface SignInFormProps {
  email: string;
  password: string;
}

const Intro = ({ navigation }) => {
  const backgroundColor = useThemeColor({}, "card");

  const handleLogin = async () => {
    try {
      const res = await Auth.signInWithEmailAndPassword(
        "ahmed_abdikani@hotmail.com",
        "ahmed1234"
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: height / 5 }}>
      <View style={{ marginBottom: padding * 10 }}>
        <Text
          style={{
            fontSize: 60,
            fontWeight: "bold",
            textAlign: "center",
            elevation: 10,
          }}
        >
          Suri
        </Text>
        <Text
          style={{
            elevation: 10,

            color: tintColorLight,
            fontSize: 30,
            fontFamily: "lobster",
            textAlign: "center",
          }}
        >
          Life made easier
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignIn")}
        style={{
          backgroundColor: tintColorLight,
          margin: padding,
          alignItems: "center",
          paddingVertical: padding * 2,
          borderRadius: padding,
          elevation: 10,
        }}
      >
        <Text
          style={{ ...Fonts.h3, color: "#fff", textTransform: "uppercase" }}
        >
          sign in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp")}
        style={{
          backgroundColor,
          margin: padding,
          alignItems: "center",
          paddingVertical: padding * 2,
          borderRadius: padding,
          elevation: 10,
        }}
      >
        <Text style={{ ...Fonts.h3, textTransform: "uppercase" }}>Sign up</Text>
      </TouchableOpacity>

      {/* <View
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
      </View> */}
    </View>
  );
};

const SignIn = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { setUser, signInWithEmail } = useAuthContext();
  const { control, errors, handleSubmit } = useForm<SignInFormProps>({
    resolver: yupResolver(signInSchema),
  });

  const signUpwithEmail = async () => {
    try {
      const usr = {
        email: "ahmed_abdikani@b.com",
        password: "ahmed1234",
      };
      const res = await Auth.createUserWithEmailAndPassword(
        usr.email,
        usr.password
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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

  const onSubmit: SubmitHandler<SignInFormProps> = async ({
    email,
    password,
  }) => {
    signInWithEmail({ email, password });
  };

  const backgroundColor = useThemeColor({}, "card");
  const color = useThemeColor({}, "text");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        // padding,
        paddingHorizontal: padding * 3,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 50,
          left: padding * 3,
          zIndex: 20,
          padding,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color={color} />
          {/* <Text>Go back</Text> */}
        </TouchableOpacity>
      </View>
      <Logo size={"m"} />
      <Text style={{ ...Fonts.h1, marginVertical: padding * 2 }}>SIGN IN</Text>
      <View>
        <CardView
          style={{
            elevation: 10,
            marginBottom: padding,
            paddingVertical: padding * 1.5,
            borderRadius: padding * 4,
            paddingLeft: padding * 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginHorizontal: padding,
              backgroundColor: "transparent",
            }}
          >
            <MaterialCommunityIcons
              name="email-outline"
              color={color}
              size={20}
            />
          </View>
          <Controller
            control={control}
            render={({ onBlur, onChange, value }) => (
              <TextInput
                returnKeyType={"next"}
                keyboardType={"email-address"}
                onChangeText={(value) => onChange(value)}
                placeholder="Enter email"
                placeholderTextColor={color}
                style={{ color, ...Fonts.body2, flex: 1 }}
              />
            )}
            name="email"
            defaultValue=""
          />
        </CardView>
        <CardView
          style={{
            elevation: 10,
            paddingHorizontal: padding * 2,
            marginBottom: padding,
            paddingVertical: padding * 1.5,
            borderRadius: padding * 4,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginHorizontal: padding,
              backgroundColor: "transparent",
            }}
          >
            <MaterialCommunityIcons name="lock" color={color} size={20} />
          </View>
          <Controller
            control={control}
            render={({ onBlur, onChange, value }) => (
              <TextInput
                secureTextEntry={secureTextEntry}
                onChangeText={(value) => onChange(value)}
                placeholder="Enter password"
                placeholderTextColor={color}
                style={{ color, flex: 1, ...Fonts.body2 }}
              />
            )}
            name="password"
            defaultValue=""
          />
          <TouchableOpacity onPress={() => setSecureTextEntry((prev) => !prev)}>
            {secureTextEntry ? (
              <Ionicons name="eye-off" size={24} color={"#ccc"} />
            ) : (
              <Ionicons name="eye" size={24} color={"#ccc"} />
            )}
          </TouchableOpacity>
        </CardView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox
              disabled={false}
              value={false}
              onValueChange={(value) => !value}
            />
            <TextSec style={Fonts.body2}>Remember Me</TextSec>
          </View>
          <Text style={{ ...Fonts.h4, color: tintColorLight }}>
            Forget Password?
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{
            alignSelf: "center",
            width: 200,
            backgroundColor: tintColorLight,
            alignItems: "center",
            paddingVertical: padding * 1.5,
            borderRadius: padding * 4,
            elevation: 10,
            justifyContent: "center",
            flexDirection: "row",
            marginTop: padding * 2,
            marginBottom: padding * 2,
          }}
        >
          <Text
            style={{ ...Fonts.h3, color: "#fff", textTransform: "uppercase" }}
          >
            sign in
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        {errors.email && <Text>{errors.email.message}</Text>}
        {errors.password && <Text>{errors.password.message}</Text>}
      </View>
      <View
        style={{
          marginVertical: padding * 3,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CardView style={{ height: 2, flex: 1 }} />
        <TextSec style={{ ...Fonts.body1, marginHorizontal: padding }}>
          OR
        </TextSec>
        <CardView style={{ height: 2, flex: 1 }} />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#5890FF",
            margin: padding,
            alignItems: "center",
            justifyContent: "center",
            elevation: 10,
            width: 50,
            height: 50,
            borderRadius: 50,
          }}
        >
          {/* <Text style={{ ...Fonts.h3, color: "#fff" }}>
            Sign up with Facebook{"  "}
          </Text> */}
          <FontAwesome name="facebook" size={30} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => null}
          style={{
            backgroundColor: "#dd4b39",
            margin: padding,
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 50,
            elevation: 10,
          }}
        >
          {/* <Text style={{ ...Fonts.h3, color: "#fff" }}>
            Sign up with Google{"  "}
          </Text> */}
          <Ionicons name="logo-google" size={24} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => null}
          style={{
            backgroundColor: "#00acee",
            margin: padding,
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 50,
            elevation: 10,
          }}
        >
          {/* <Text style={{ ...Fonts.h3, color: "#fff" }}>
            Sign up with Google{"  "}
          </Text> */}
          <Ionicons name="ios-logo-twitter" size={24} color={"#fff"} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: padding * 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: padding,
          }}
        >
          <TextSec style={Fonts.body3}>Don't have an account?</TextSec>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={{ flexDirection: "row" }}
          >
            <Text style={{ color: tintColorLight, ...Fonts.h3 }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const SignUp = ({ navigation }) => {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { setUser, signUpWithEmail } = useAuthContext();
  const { control, errors, handleSubmit } = useForm<SignUpFormProps>({
    resolver: yupResolver(signUpSchema),
  });
  const color = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const onSubmit: SubmitHandler<SignUpFormProps> = (data) => {
    signUpWithEmail(data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        paddingTop: 100,
        // padding,
        paddingHorizontal: padding * 3,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 50,
          left: padding * 3,
          zIndex: 20,
          padding,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color={color} />
          {/* <Text>Go back</Text> */}
        </TouchableOpacity>
      </View>
      <Logo size={"m"} />
      <Text style={{ ...Fonts.h1, marginVertical: padding * 2 }}>SIGN UP</Text>
      <View>
        <CardView
          style={{
            elevation: 10,
            marginBottom: padding,
            paddingVertical: padding * 1.5,
            borderRadius: padding * 4,
            paddingLeft: padding * 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginHorizontal: padding,
              backgroundColor: "transparent",
            }}
          >
            <MaterialIcons name="person" color={color} size={20} />
          </View>
          <Controller
            control={control}
            render={({ onBlur, onChange, value }) => (
              <TextInput
                value={value}
                returnKeyType={"next"}
                onChangeText={(value) => onChange(value)}
                placeholder="Enter Name..."
                placeholderTextColor={color}
                onBlur={onBlur}
              />
            )}
            name="name"
            defaultValue=""
          />
        </CardView>
        <CardView
          style={{
            elevation: 10,
            marginBottom: padding,
            paddingVertical: padding * 1.5,
            borderRadius: padding * 4,
            paddingLeft: padding * 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginHorizontal: padding,
              backgroundColor: "transparent",
            }}
          >
            <MaterialCommunityIcons
              name="email-outline"
              color={color}
              size={20}
            />
          </View>
          <Controller
            control={control}
            render={({ onBlur, onChange, value }) => (
              <TextInput
                returnKeyType={"next"}
                keyboardType={"email-address"}
                onChangeText={(value) => onChange(value)}
                placeholder="Enter Email..."
                placeholderTextColor={color}
                style={{ color, ...Fonts.body2, flex: 1 }}
                value={value}
              />
            )}
            name="email"
            defaultValue=""
          />
        </CardView>
        <CardView
          style={{
            elevation: 10,
            paddingHorizontal: padding * 2,
            marginBottom: padding,
            paddingVertical: padding * 1.5,
            borderRadius: padding * 4,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginHorizontal: padding,
              backgroundColor: "transparent",
            }}
          >
            <MaterialCommunityIcons name="lock" color={color} size={20} />
          </View>
          <Controller
            control={control}
            render={({ onBlur, onChange, value }) => (
              <TextInput
                secureTextEntry={secureTextEntry}
                onChangeText={(value) => onChange(value)}
                placeholder="Enter Password..."
                placeholderTextColor={color}
                style={{ color, flex: 1, ...Fonts.body2 }}
                value={value}
              />
            )}
            name="password"
            defaultValue=""
          />
          <TouchableOpacity onPress={() => setSecureTextEntry((prev) => !prev)}>
            {secureTextEntry ? (
              <Ionicons name="eye-off" size={24} color={"#ccc"} />
            ) : (
              <Ionicons name="eye" size={24} color={"#ccc"} />
            )}
          </TouchableOpacity>
        </CardView>
        <CardView
          style={{
            elevation: 10,
            paddingHorizontal: padding * 2,
            marginBottom: padding,
            paddingVertical: padding * 1.5,
            borderRadius: padding * 4,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginHorizontal: padding,
              backgroundColor: "transparent",
            }}
          >
            <MaterialCommunityIcons name="lock" color={color} size={20} />
          </View>
          <Controller
            control={control}
            render={({ onBlur, onChange, value }) => (
              <TextInput
                secureTextEntry={secureTextEntry}
                onChangeText={(value) => onChange(value)}
                placeholder="Confirm password"
                placeholderTextColor={color}
                style={{ color, flex: 1, ...Fonts.body2 }}
                value={value}
              />
            )}
            name="passwordConform"
            defaultValue=""
          />
          <TouchableOpacity onPress={() => setSecureTextEntry((prev) => !prev)}>
            {secureTextEntry ? (
              <Ionicons name="eye-off" size={24} color={"#ccc"} />
            ) : (
              <Ionicons name="eye" size={24} color={"#ccc"} />
            )}
          </TouchableOpacity>
        </CardView>

        <Pressable
          // disabled={!disabled}
          onPress={handleSubmit(onSubmit)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            alignSelf: "center",
            width: 200,
            backgroundColor: tintColorLight,
            alignItems: "center",
            paddingVertical: padding * 1.5,
            borderRadius: padding * 4,
            elevation: 10,
            justifyContent: "center",
            flexDirection: "row",
            marginTop: padding * 2,
            marginBottom: padding * 2,
          })}
        >
          <Text
            style={{ ...Fonts.h3, color: "#fff", textTransform: "uppercase" }}
          >
            sign up
          </Text>
        </Pressable>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {error && <Text>{error}</Text>}
        {errors.name && <Text>{errors.name.message}</Text>}
        {errors.email && <Text>{errors.email.message}</Text>}
        {errors.password && <Text>{errors.password.message}</Text>}
        {errors.passwordConform && (
          <Text style={{ ...Fonts.body2, color: "#ff7961" }}>
            # {errors.passwordConform.message}
          </Text>
        )}
      </View>

      <View
        style={{
          alignSelf: "center",
          // position: "absolute",
          // bottom: padding * 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: padding,
          }}
        >
          <TextSec style={Fonts.body3}>Already have an account?</TextSec>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            style={{ flexDirection: "row" }}
          >
            <Text style={{ color: tintColorLight, ...Fonts.h3 }}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const AuthStack = createStackNavigator();

const AuthNavigator = ({}: IAuthStackProps) => {
  return (
    <AuthStack.Navigator
      initialRouteName="Intro"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Intro" component={Intro} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
