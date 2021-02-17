import * as React from "react";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyleSheet } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { BackButtonNative } from "../../components/button/BackButton";
import Button from "../../components/button/Button";
import ButtonSecureText from "../../components/button/ButtonSecureText";
import InputForm from "../../components/input/InputForm";
import Logo from "../../components/Logo";
import { CardView, Text, TextSec, View } from "../../components/Theme";
import useThemeColor from "../../hooks/useThemeColor";
import { tintColorLight } from "../../constants/Colors";
import { Fonts, Sizes, Styles } from "../../constants/Styles";
import { useAuthContext } from "../../context/AuthContext";
import { AuthNavigationProp, SignInFormProps } from "../../types/Auth";
import Error from "../../components/Error";

const spacing = Sizes.base;

const schema = yup.object().shape({
  email: yup.string().required().email().trim(),
  password: yup.string().required().trim(),
});

interface SignInProps extends AuthNavigationProp<"SignIn"> {}

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const { signInWithEmail } = useAuthContext();
  const { control, errors, handleSubmit } = useForm<SignInFormProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignInFormProps> = async ({
    email,
    password,
  }) => {
    signInWithEmail({ email, password });
  };

  const color = useThemeColor({}, "text");

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 50,
          left: spacing * 3,
          zIndex: 20,
        }}
      >
        <BackButtonNative />
      </View>
      <Logo size={"m"} />
      <Text style={styles.headerText}>SIGN IN</Text>
      <View>
        <InputForm
          control={control}
          left={() => (
            <MaterialCommunityIcons
              name="email-outline"
              color={color}
              size={20}
            />
          )}
          placeholder="Enter Email..."
          name="email"
          keyboardType={"email-address"}
        />
        <InputForm
          control={control}
          left={() => (
            <MaterialCommunityIcons name="lock" color={color} size={20} />
          )}
          right={() => (
            <ButtonSecureText
              setSecureTextEntry={setSecureTextEntry}
              secureTextEntry={secureTextEntry}
            />
          )}
          placeholder="Enter Password..."
          name="password"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ ...Fonts.h4, color: tintColorLight }}>
            Forget Password?
          </Text>
        </View>
        <Button onPress={handleSubmit(onSubmit)} style={styles.signinBtn}>
          <Text style={styles.signinBtnText}>sign in</Text>
        </Button>
      </View>
      <View style={Styles.centerH}>
        <Error error={errors.email?.message} />
        <Error error={errors.password?.message} />
      </View>
      <View
        style={{
          marginVertical: spacing * 3,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CardView style={{ height: 2, flex: 1 }} />
        <TextSec style={{ ...Fonts.body1, marginHorizontal: spacing }}>
          OR
        </TextSec>
        <CardView style={{ height: 2, flex: 1 }} />
      </View>

      <View style={[Styles.centerHV, Styles.fRow]}>
        <Button
          style={[
            styles.brandBtn,
            {
              backgroundColor: "#5890FF",
            },
          ]}
        >
          <FontAwesome name="facebook" size={30} color={"#fff"} />
        </Button>
        <Button
          onPress={() => null}
          style={[
            styles.brandBtn,
            {
              backgroundColor: "#dd4b39",
            },
          ]}
        >
          <Ionicons name="logo-google" size={24} color={"#fff"} />
        </Button>
        <Button
          onPress={() => null}
          style={[
            styles.brandBtn,
            {
              backgroundColor: "#00acee",
            },
          ]}
        >
          <Ionicons name="ios-logo-twitter" size={24} color={"#fff"} />
        </Button>
      </View>
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: spacing * 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: spacing,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing,
  },
  headerText: { ...Fonts.h1, marginVertical: spacing * 2 },
  brandBtn: {
    ...Styles.centerHV,
    width: 50,
    height: 50,
    borderRadius: 50,
    elevation: 10,
  },
  signinBtnText: { ...Fonts.h3, color: "#fff", textTransform: "uppercase" },
  signinBtn: {
    ...Styles.centerSelf,
    ...Styles.centerHV,
    width: 200,
    backgroundColor: tintColorLight,
    paddingVertical: spacing * 1.5,
    borderRadius: spacing * 4,
    elevation: 10,
    marginTop: spacing * 2,
    marginBottom: spacing * 2,
  },
});

export default SignIn;
