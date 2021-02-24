import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, { useAnimatedProps } from "react-native-reanimated";

import View from "../theme/View";
import Center from "../theme/Center";
import Layout from "../../constants/Layout";
import { Sizes } from "../../constants/Styles";

Animated.addWhitelistedUIProps({
  text: true,
  value: true,
});
const AnimatedText = Animated.createAnimatedComponent(TextInput);
const spacing = Sizes.base;

interface PaginationProps {
  x: Animated.SharedValue<number>;
  total: number;
  width: number;
}
const Pagination = ({ x, total, width }: PaginationProps) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      value: Math.round(x.value / width) + 1 + "/ " + 5,
    };
  });
  return (
    <View style={styles.container}>
      <Center>
        <AnimatedText
          style={styles.text}
          editable={false}
          animatedProps={animatedProps}
        />
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 60,
    position: "absolute",
    bottom: spacing,
    right: 0,
    marginRight: spacing,
    borderRadius: spacing * 2,
    backgroundColor: "#666",
  },
  text: { color: "#fff" },
});

export default Pagination;
