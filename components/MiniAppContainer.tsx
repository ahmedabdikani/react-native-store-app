import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {
  tintColorLight,
  lightBlue,
  lightRed,
  lightGreen,
} from "../constants/Colors";
import Layout from "../constants/Layout";
import MiniAppCard from "./MiniAppsCard";
import { View } from "./Themed";

const { height, width } = Layout.window;
const miniAppWidth = (width - 60) / 4;

interface props {
  colors: any;
}

const MiniAppsContainer = ({ colors }: props) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
      {[
        {
          appIcon: "hotel",
          name: "FontAwesome5",
          appName: "Hotels",
          color: lightBlue,
        },
        {
          name: "FontAwesome5",
          appIcon: "plane",
          appName: "Tickets",
          color: tintColorLight,
        },
        {
          name: "FontAwesome",
          appIcon: "bank",
          appName: "Bank",
          color: lightGreen,
        },
        {
          name: "FontAwesome",
          appIcon: "mobile-phone",
          appName: "Phone Recharge",
          color: lightRed,
        },
      ].map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            <MiniAppCard
              width={miniAppWidth}
              color={item.color}
              appName={item.appName}
              appIcon={() => {
                switch (item.name) {
                  case "FontAwesome":
                    return (
                      <FontAwesome
                        name={item.appIcon}
                        size={30}
                        color={item.color}
                      />
                    );
                    break;
                  case "FontAwesome5":
                    return (
                      <FontAwesome5
                        color={item.color}
                        name={item.appIcon}
                        size={24}
                      />
                    );
                    break;
                }
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MiniAppsContainer;
