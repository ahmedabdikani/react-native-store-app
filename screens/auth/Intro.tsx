import * as React from "react";

import Button from "../../components/button/Button";
import { Text, useThemeColor, View } from "../../components/Themed";
import { tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Fonts, Sizes } from "../../constants/Styles";
import { AuthNavigationProp } from "../../types/Auth";

const { width, height } = Layout.window;
const padding = Sizes.base;

interface IIntroProps extends AuthNavigationProp<"Intro"> {}

const Intro: React.FC<IIntroProps> = ({ navigation }: IIntroProps) => {
  const backgroundColor = useThemeColor({}, "card");

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
      <Button
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
      </Button>
      <Button
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
      </Button>
    </View>
  );
};

export default Intro;
