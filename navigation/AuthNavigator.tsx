import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CheckBox from "@react-native-community/checkbox";
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

import user from "../types/User";
import Layout from "../constants/Layout";
import Logo from "../components/Logo";
import { TextInput } from "react-native";
import { AuthNavigationProp } from "../types/Auth";
import SignUp from "../screens/auth/SignUp";
import Intro from "../screens/auth/Intro";
import Button from "../components/Button";

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

interface ISignInProps extends AuthNavigationProp<"SignIn"> {}

const SignIn: React.FC<ISignInProps> = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const { signInWithEmail } = useAuthContext();
  const { control, errors, handleSubmit } = useForm<SignInFormProps>({
    resolver: yupResolver(signInSchema),
  });

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
        <Button
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color={color} />
          {/* <Text>Go back</Text> */}
        </Button>
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
          <Button onPress={() => setSecureTextEntry((prev) => !prev)}>
            {secureTextEntry ? (
              <Ionicons name="eye-off" size={24} color={"#ccc"} />
            ) : (
              <Ionicons name="eye" size={24} color={"#ccc"} />
            )}
          </Button>
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
        <Button
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
        </Button>
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
        <Button
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
        </Button>
        <Button
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
        </Button>
        <Button
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
        </Button>
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

          <Button
            onPress={() => navigation.navigate("SignUp")}
            style={{ flexDirection: "row" }}
          >
            <Text style={{ color: tintColorLight, ...Fonts.h3 }}> Sign Up</Text>
          </Button>
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
