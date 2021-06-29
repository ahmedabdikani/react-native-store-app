import * as React from "react";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BackButtonNative from "../../components/button/BackButtonNative";
import Button from "../../components/button/Button";
import ButtonSecureText from "../../components/button/ButtonSecureText";
import InputForm from "../../components/input/InputForm";
import { View } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { tintColorLight } from "../../constants/Colors";
import { Fonts, Sizes, Styles } from "../../constants/Styles";
import { useAuthContext } from "../../context/auth/AuthContext";
import { SignInFormProps, AuthScreenProps } from "../../types/Auth";

import Layout from "../../constants/Layout";
import { Body2, ButtonText, H6, Subtitle1 } from "../../components/typography";
import Center from "../../components/center/Center";
import Logo from "../../components/Logo";
import Error from "../../components/Error";

const spacing = Sizes.spacing.s;
const { height } = Layout.window;

const schema = yup.object().shape({
  email: yup.string().required().email().trim(),
  password: yup.string().required().trim(),
});

interface SignInProps extends AuthScreenProps<"SignIn"> {}

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const color = useThemeColor({}, "text");
  const { top } = useSafeAreaInsets();
  const { signInWithEmail } = useAuthContext();
  const { control, errors, handleSubmit } = useForm<SignInFormProps>({
    resolver: yupResolver(schema),
  });
  const [error, setError] = React.useState("");

  const onSubmit: SubmitHandler<SignInFormProps> = async ({
    email,
    password,
  }) => {
    signInWithEmail({ email, password }).catch((err) => setError(err.message));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          top: 50,
          left: spacing,
          zIndex: 20,
        }}
      >
        <BackButtonNative />
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            margin: spacing * 3,
            marginTop: 100,
          }}
        >
          <Logo size="m" />
          <H6 style={{ textAlign: "center", marginBottom: spacing * 2 }}>
            SIGN IN
          </H6>
          <View>
            <InputForm
              secureTextEntry={secureTextEntry}
              error={errors.email}
              control={control}
              left={() => (
                <MaterialCommunityIcons
                  name="email-outline"
                  color={color}
                  size={20}
                />
              )}
              placeholder="Enter email..."
              name="email"
              keyboardType={"email-address"}
            />
            <InputForm
              secureTextEntry={secureTextEntry}
              error={errors.password}
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
              placeholder="Enter password..."
              name="password"
            />

            {/* <Subtitle1
            primary
            style={{
              margin: spacing,
              marginBottom: spacing * 4,
              alignSelf: "flex-end",
            }}
            >
            Forget Password?
          </Subtitle1> */}

            <Button
              style={{
                alignSelf: "center",
                width: 200,
                flexDirection: "row",
                padding: spacing * 1.2,
                marginTop: spacing,
                borderRadius: spacing * 4,
              }}
              primary
              onPress={handleSubmit(onSubmit)}
            >
              <Center>
                <ButtonText style={{ color: "#fff" }}>Sign in</ButtonText>
              </Center>
            </Button>
          </View>
          <Error error={error} />
        </View>
      </ScrollView>
      <View style={{}} />
      <SocialMedia />
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: spacing,
            alignItems: "center",
          }}
        >
          <Body2 secondary>Don't have an account?</Body2>
          <Button
            onPress={() => navigation.navigate("SignUp")}
            style={{ flexDirection: "row" }}
          >
            <Subtitle1 primary> Sign Up</Subtitle1>
          </Button>
        </View>
      </View>
    </View>
  );
};

const SocialMedia = () => {
  const { signInWithFacebook } = useAuthContext();
  const color = "#fff";
  return (
    <View transparent style={[Styles.centerHV, Styles.fRow]}>
      <View>
        <Button
          onPress={signInWithFacebook}
          style={[styles.brandBtn, { backgroundColor: "#5890FF" }]}
        >
          <FontAwesome name="facebook" size={30} color={color} />
        </Button>
      </View>
      <Button
        onPress={() => null}
        style={[styles.brandBtn, { backgroundColor: "#dd4b39" }]}
      >
        <Ionicons name="logo-google" size={34} color={color} />
      </Button>
      <Button
        onPress={() => null}
        style={[styles.brandBtn, { backgroundColor: "#00acee" }]}
      >
        <Ionicons name="ios-logo-twitter" size={34} color={color} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    ...Fonts.h1,
    marginVertical: spacing,
    textAlign: "center",
  },
  brandBtn: {
    ...Styles.centerHV,
    width: 60,
    height: 60,
    borderRadius: 60,
    // backgroundColor: "#333",
    marginLeft: spacing,
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
