import * as React from "react";
import { StyleSheet } from "react-native";

import Button from "../../components/button/Button";
import { View } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { tintColorLight } from "../../constants/Colors";
import { Sizes } from "../../constants/Styles";
import { AuthNavigationProp } from "../../types/Auth";
import Logo from "../../components/Logo";
import { H3 } from "../../components/typography";

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
        <H3 style={[styles.buttonText, styles.white]}>sign in</H3>
      </Button>
      <Button
        onPress={() => navigation.navigate("SignUp")}
        style={[styles.button, { backgroundColor }]}
      >
        <H3 style={styles.buttonText}>Sign up</H3>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  white: { color: "#fff" },

  button: {
    backgroundColor: tintColorLight,
    margin: padding,
    alignItems: "center",
    paddingVertical: padding,
    borderRadius: padding,
    elevation: 10,
  },
  buttonText: {
    textTransform: "uppercase",
  },
});

export default Intro;
