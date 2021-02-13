import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import Button from "../../components/button/Button";
import {
  CardView,
  Text,
  TextSec,
  useThemeColor,
  View,
} from "../../components/Themed";
import { Fonts, Sizes } from "../../constants/Styles";
import { AuthNavigationProp } from "../../types/Auth";
import * as yup from "yup";
import { useAuthContext } from "../../context/AuthContext";
import { SignUpFormProps } from "../../navigation/AuthNavigator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import Input from "../../components/input/Input";
import { tintColorLight } from "../../constants/Colors";
import { Platform } from "react-native";
import { BackButtonNative } from "../../components/button/BackButton";
import InputControlled from "../../components/input/InputControlled";
import Error from "../../components/Error";
import { color } from "react-native-reanimated";

const padding = Sizes.base;

const signUpSchema = yup.object().shape({
  name: yup.string().required("Please Enter Name").trim().min(4),
  email: yup.string().required("Please Enter Email").email().trim(),
  password: yup.string().required("Please Enter Password").trim().min(8),
  passwordConform: yup
    .string()
    .required("Please Enter Conform Password")
    .trim()
    .oneOf([yup.ref("password"), null], "Passwords Must Match"),
});

interface ISignUpProps extends AuthNavigationProp<"SignUp"> {}

const SignUp: React.FC<ISignUpProps> = ({ navigation }) => {
  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const { signUpWithEmail } = useAuthContext();
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
        paddingTop: 100,
        paddingHorizontal: padding * 2,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 50,
          left: padding * 2,
          zIndex: 20,
          padding,
        }}
      >
        <BackButtonNative />
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
          <InputControlled
            keyboardType={"default"}
            control={control}
            placeholder="Enter Name..."
            name="name"
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
          <InputControlled
            keyboardType={"email-address"}
            control={control}
            placeholder={"Enter Email..."}
            name="email"
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
          <InputControlled
            control={control}
            keyboardType={"default"}
            name={"password"}
            placeholder={"Enter password..."}
          />
          <Button onPress={() => setSecureTextEntry((prev) => !prev)}>
            {secureTextEntry ? (
              <Ionicons name="eye-off" size={24} color={"#ccc"} />
            ) : (
              <Ionicons name="eye" size={24} color={"#ccc"} />
            )}
          </Button>
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
          <InputControlled
            placeholder={"Enter password..."}
            control={control}
            name={"passwordConform"}
            keyboardType={"default"}
          />
          <Button onPress={() => setSecureTextEntry((prev) => !prev)}>
            {secureTextEntry ? (
              <Ionicons name="eye-off" size={24} color={"#ccc"} />
            ) : (
              <Ionicons name="eye" size={24} color={"#ccc"} />
            )}
          </Button>
        </CardView>

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
            sign up
          </Text>
        </Button>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {error && <Error error={error} />}
        {errors.name && <Error error={errors.name.message} />}
        {errors.email && <Error error={errors.email.message} />}
        {errors.password && <Error error={errors.password.message} />}
        {errors.passwordConform && (
          <Error error={errors.passwordConform.message} />
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

          <Button
            onPress={() => navigation.navigate("SignIn")}
            style={{ flexDirection: "row" }}
          >
            <Text style={{ color: tintColorLight, ...Fonts.h3 }}> Sign In</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
