import * as React from "react";
import { StyleSheet } from "react-native";

import Button from "../../components/button/Button";
import { Text, View } from "../../components/Theme";
import useThemeColor from "../../hooks/useThemeColor";
import { tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Fonts, Sizes } from "../../constants/Styles";
import { AuthNavigationProp } from "../../types/Auth";
import Logo from "../../components/Logo";

const { height } = Layout.window;
const padding = Sizes.base;

interface IntroProps extends AuthNavigationProp<"Intro"> {}

const Intro: React.FC<IntroProps> = ({ navigation }) => {
  const backgroundColor = useThemeColor({}, "card");

  return (
    <View style={styles.container}>
      <Logo size="m" />
      <Button
        onPress={() => navigation.navigate("SignIn")}
        style={styles.button}
      >
        <Text style={[styles.buttonText, styles.white]}>sign in</Text>
      </Button>
      <Button
        onPress={() => navigation.navigate("SignUp")}
        style={[styles.button, { backgroundColor }]}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height / 5,
  },
  white: { color: "#fff" },

  button: {
    backgroundColor: tintColorLight,
    margin: padding,
    alignItems: "center",
    paddingVertical: padding * 2,
    borderRadius: padding,
    elevation: 10,
  },
  buttonText: {
    ...Fonts.h3,
    textTransform: "uppercase",
  },
});

export default Intro;
