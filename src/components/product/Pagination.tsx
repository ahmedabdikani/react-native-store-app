import * as React from "react";
import { StyleSheet, TextInput } from "react-native";

import Animated, { useAnimatedProps } from "react-native-reanimated";

import { View, Center } from "../theme";

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
