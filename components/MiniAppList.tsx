import * as React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import {
  tintColorLight,
  lightBlue,
  lightRed,
  lightGreen,
} from "../constants/Colors";
import MiniAppItem from "./MiniAppItem";
import { View } from "./Theme";
import { Sizes } from "../constants/Styles";
import ListSmall from "./list/ListSmall";

const miniApps = [
  {
    icon: "hotel",
    type: "FontAwesome5",
    name: "Hotels",
    color: lightBlue,
  },
  {
    type: "FontAwesome5",
    icon: "plane",
    name: "Tickets",
    color: tintColorLight,
  },
  {
    type: "FontAwesome",
    icon: "bank",
    name: "Bank",
    color: lightGreen,
  },
  {
    type: "FontAwesome",
    icon: "mobile-phone",
    name: "Phone Recharge",
    color: lightRed,
  },
];
const spacing = Sizes.base;

interface MiniAppListProps {}

const MiniAppList: React.FC<MiniAppListProps> = ({}) => {
  return (
    <View style={styles.constainer}>
      <ListSmall data={miniApps}>
        {({ item, index }) => (
          <MiniAppItem
            key={index}
            color={item.color}
            appName={item.name}
            appIcon={() => {
              switch (item.type) {
                case "FontAwesome":
                  return (
                    <FontAwesome
                      name={item.icon}
                      size={30}
                      color={item.color}
                    />
                  );
                  break;
                default:
                  return (
                    <FontAwesome5
                      color={item.color}
                      name={item.icon}
                      size={24}
                    />
                  );
                  break;
              }
            }}
          />
        )}
      </ListSmall>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: spacing,
  },
});

export default MiniAppList;
