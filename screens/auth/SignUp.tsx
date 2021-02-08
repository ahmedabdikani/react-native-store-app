import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import Button from "../../components/Button";
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
import Input from "../../components/Input";
import { tintColorLight } from "../../constants/Colors";

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
  const [error, setError] = React.useState(null);
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
              <Input
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
              <Input
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
              <Input
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
          <Controller
            control={control}
            render={({ onBlur, onChange, value }) => (
              <Input
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
        </Button>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {error && <Text>{error}</Text>}
        {errors.name && <Text>{errors.name.message}</Text>}
        {errors.email && <Text>{errors.email.message}</Text>}
        {errors.password && <Text>{errors.password.message}</Text>}
        {errors.passwordConform && (
          <Text style={{ ...Fonts.body2, color: tintColorLight }}>
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
