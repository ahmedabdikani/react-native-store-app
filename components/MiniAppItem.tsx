import * as React from "react";
import { StyleSheet } from "react-native";

import CardView from "./Theme/CardView";
import Layout from "../constants/Layout";
import Button from "./button/Button";
import { Sizes, Styles } from "../constants/Styles";
import Subtitle from "./typography/Subtitle";

const { width } = Layout.window;
const miniAppWidth = (width - 60) / 4;
const spacing = Sizes.base;

interface MiniAppItemProps {
  appName: string;
  appIcon: () => JSX.Element;
  color: string;
}

const MiniAppItem = ({ appName, appIcon, color }: MiniAppItemProps) => {
  return (
    <Button>
      <CardView style={styles.card}>
        {appIcon()}
        <Subtitle numberOfLines={1} style={styles.cardText}>
          {appName}
        </Subtitle>
      </CardView>
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
    ...Styles.centerHV,
  },
  cardText: {
    marginTop: 10,
  },
});

export default MiniAppItem;
