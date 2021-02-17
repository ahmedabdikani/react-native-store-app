import * as React from "react";
import { Image } from "react-native";
import { HomeNavigationProps } from "types/Home";

import Button from "../../components/button/Button";
import { View } from "../../components/Theme";
import Layout from "../../constants/Layout";

const { width, height } = Layout.window;

interface ViewScreenProps extends HomeNavigationProps<"ViewContent"> {}

const ViewScreen = ({ navigation, route }: ViewScreenProps) => {
  return (
    <Button onPress={() => navigation.goBack()} style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: route.params?.uri }}
          style={{
            width,
            height: height / 1.7,
            resizeMode: "cover",
          }}
        />
      </View>
    </Button>
  );
};
export default ViewScreen;
