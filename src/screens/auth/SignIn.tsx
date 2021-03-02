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

import BackButtonNative from "../../components/button/BackButtonNative";
import Button from "../../components/button/Button";
import ButtonSecureText from "../../components/button/ButtonSecureText";
import InputForm from "../../components/input/InputForm";
import { Card, View } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { tintColorLight } from "../../constants/Colors";
import { Fonts, Sizes, Styles } from "../../constants/Styles";
import { useAuthContext } from "../../context/AuthContext";
import { AuthNavigationProp, SignInFormProps } from "../../types/Auth";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Gradient from "../../components/Gradient";
import Layout from "../../constants/Layout";
import { Body2, H2, H6, Subtitle1, H1 } from "../../components/typography";

const spacing = Sizes.base;
const { height } = Layout.window;

const schema = yup.object().shape({
  email: yup.string().required().email().trim(),
  password: yup.string().required().trim(),
});

interface SignInProps extends AuthNavigationProp<"SignIn"> {}

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const color = useThemeColor({}, "text");
  const { top } = useSafeAreaInsets();
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
      <View
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Gradient>
          <View
            style={{
              backgroundColor: "transparent",
              alignContent: "center",
              paddingTop: top + spacing * 3,
              paddingLeft: spacing * 2,
            }}
          >
            <H1 style={{ color: "#fff" }}>Welcome</H1>
            <Subtitle1 numberOfLines={2} style={{ color: "#fff" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus omnis am
            </Subtitle1>
          </View>
        </Gradient>
      </View>

      <Card
        style={{
          margin: spacing * 3,
          padding: spacing * 2,
          borderRadius: spacing * 2,
          // marginTop: 0,
        }}
      >
        <H6 style={{ textAlign: "center", marginBottom: spacing * 2 }}>
          SIGN IN
        </H6>
        <Card>
          <InputForm
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

          <Subtitle1
            primary
            style={{
              margin: spacing,
              marginBottom: spacing * 4,
              alignSelf: "flex-end",
            }}
          >
            Forget Password?
          </Subtitle1>
          <Card
            style={{
              padding: 10,
              borderRadius: 50,
              alignSelf: "center",
              position: "absolute",
              bottom: -50,
            }}
          >
            <Button primary onPress={handleSubmit(onSubmit)}>
              <Ionicons name="arrow-forward" size={24} color={"#fff"} />
            </Button>
          </Card>
        </Card>
      </Card>
      <View style={{ flex: 1 }} />
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

const SocialMedia = () => (
  <View transparent style={[Styles.centerHV, Styles.fRow]}>
    <View>
      <Button style={styles.brandBtn}>
        <FontAwesome name="facebook" size={30} color={"#5890FF"} />
      </Button>
    </View>
    <Button onPress={() => null} style={[styles.brandBtn]}>
      <Ionicons name="logo-google" size={34} color={"#dd4b39"} />
    </Button>
    <Button onPress={() => null} style={[styles.brandBtn]}>
      <Ionicons name="ios-logo-twitter" size={34} color={"#00acee"} />
    </Button>
  </View>
);

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
    elevation: 10,
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
