import * as React from "react";
import { StyleSheet } from "react-native";

import Layout from "../constants/Layout";
import Button from "./button/Button";
import { Sizes } from "../constants/Styles";
import Subtitle1 from "./typography/Subtitle1";
import Center from "./center/Center";
import useThemeColor from "../hooks/useThemeColor";

const { width } = Layout.window;
const miniAppWidth = (width - 60) / 4;
const spacing = Sizes.base;

interface MiniAppItemProps {
  appName: string;
  appIcon: () => JSX.Element;
  color: string;
}

const MiniAppItem = ({ appName, appIcon, color }: MiniAppItemProps) => {
  const backgroundColor = useThemeColor({}, "card");

  return (
    <Button style={[styles.card, { backgroundColor }]}>
      <Center>
        {appIcon()}
        <Subtitle1 numberOfLines={1} style={styles.cardText}>
          {appName}
        </Subtitle1>
      </Center>
    </Button>
  );
};

const styles = StyleSheet.create({
  card: {
    width: miniAppWidth,
    height: miniAppWidth,
    padding: spacing,
    borderRadius: spacing,
    marginRight: spacing,
  },
  cardText: {
    marginTop: 10,
  },
});

export default MiniAppItem;
