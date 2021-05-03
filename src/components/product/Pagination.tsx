import React from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";

import { View } from "../theme";
import Center from "../center/Center";
import { Sizes } from "../../constants/Styles";

Animated.addWhitelistedNativeProps({ text: true });

const AnimatedText = Animated.createAnimatedComponent(TextInput);
const spacing = Sizes.spacing.s;

interface PaginationProps {
  x: Animated.SharedValue<number>;
  total: number;
  width: number;
}

const Pagination = ({ x, total, width }: PaginationProps) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(x.value / width) + 1}/${total}`,
    };
  });
  return (
    <View style={styles.container}>
      <Center>
        <AnimatedText
          defaultValue={`1/${total}`}
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
    backgroundColor: "#222",
  },
  text: { color: "#fff" },
});

export default Pagination;
