import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Defs, Stop, LinearGradient as LG, Rect } from "react-native-svg";
import Layout from "../../constants/Layout";
import { colorThemes } from "../../constants/Theme";
import { View } from "../theme";

// export { themes }

const { width, height } = Layout.window;

interface LinearGradientProps {
  // theme: Theme
  // activeThemeId: Animated.SharedValue<number>
}

const LinearGradient: React.FC<LinearGradientProps> = ({}) => {
  // const { id, colors } = themes[2];
  // const isActive = useDerivedValue(() => id === id);

  // const opacity = useAnimatedStyle(() => {
  //   return { opacity: isActive.value ? 1 : 0 };
  // });

  const theme = colorThemes[2];

  return (
    // <Animated.View >
    //   {colors.length > 1 ? (
    //     <LG colors={colors} style={styles.fill} />
    //   ) : (
    //     <View style={{ backgroundColor: colors[0], ...styles.fill }} />
    //   )}
    // </Animated.View>
    <View style={{ width, height }}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <LG id="myGradient" x1={0} x2={0} y1={0} y2={0.8}>
            {/* <Stop offset="5%" stop-color="gold" />
          <Stop offset="95%" stop-color="red" /> */}
            {theme.colors.map((color, index) => (
              <Stop
                stopColor={color}
                key={index}
                offset={
                  Math.floor((index + 1 / theme.colors.length) * 100) + "%"
                }
              />
            ))}
          </LG>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={width}
          height={height * 0.9}
          fill="url(#myGradient)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: {
    width,
    height,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default LinearGradient;
