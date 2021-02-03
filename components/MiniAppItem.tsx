import { Entypo } from "@expo/vector-icons";
import React, { ReactComponentElement } from "react";
import { StyleSheet } from "react-native";

import { tintColorLight } from "../constants/Colors";
import { Text, useThemeColor, View } from "./Themed";

interface props {
  appName: string;
  appIcon: any;
  color: string;
  width: number;
}

const MiniAppCard = ({ appName, appIcon, color, width }: props) => {
  const bg = useThemeColor({}, "card");

  return (
    <View style={[styles.card, { width, height: width, backgroundColor: bg }]}>
      {appIcon()}
      <Text numberOfLines={1} style={styles.cardText}>
        {appName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default MiniAppCard;
