import * as React from "react";
import { StyleSheet } from "react-native";

import Button from "../../components/button/Button";
import { View } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { Sizes } from "../../constants/Styles";
import { AuthNavigationProp } from "../../types/Auth";
import Logo from "../../components/Logo";
import { Subtitle1 } from "../../components/typography";

const padding = Sizes.base;

interface ntroProps extends AuthNavigationProp<"Intro"> {}

const Intro: React.FC<ntroProps> = ({ navigation }) => {
  const backgroundColor = useThemeColor({}, "card");

  return (
    <View style={styles.container}>
      <Logo size="m" />
      <Button
        primary
        onPress={() => navigation.navigate("SignIn")}
        style={styles.button}
      >
        <Subtitle1 style={[styles.buttonText, styles.white]}>sign in</Subtitle1>
      </Button>
      <Button
        onPress={() => navigation.navigate("SignUp")}
        style={[styles.button, { backgroundColor }]}
      >
        <Subtitle1 style={styles.buttonText}>Sign up</Subtitle1>
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
    margin: padding,
    alignItems: "center",
    paddingVertical: padding,
    borderRadius: padding,
    elevation: 10,
  },
  buttonText: {
    textTransform: "uppercase",
    paddingVertical: padding,
  },
});

export default Intro;
