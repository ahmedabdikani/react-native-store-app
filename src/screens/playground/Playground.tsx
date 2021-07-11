import React from "react";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { lightenGreen, lightGreen } from "../../constants/Colors";
import RadialGradient from "../../components/gradient/RadialGradient";
import { View } from "../../components/theme";
import Layout from "../../constants/Layout";

const { width, height } = Layout.window;

interface PlaygroundProps {}

const Playground = ({}: PlaygroundProps) => {
  const x = useSharedValue<number>(0);
  const y = useSharedValue<number>(0);

  const style = useAnimatedStyle(() => ({
    minHeight: height,
    width,
    backgroundColor: "",
    // borderRadius: 50,
    transform: [
      {
        translateY: interpolate(
          y.value,
          [0, -400],
          [0, y.value],
          Extrapolate.CLAMP
        ),
      },
      //{ translateX: x.value }
    ],
  }));

  const imageStyle = useAnimatedStyle(() => {
    const inputRange = [0, 300];
    const scale = interpolate(y.value, inputRange, [1, 1.5], Extrapolate.CLAMP);
    return {
      transform: [{ scale: scale }],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      y.value = translationY + ctx.y;
      x.value = translationX + ctx.x;

      console.log(translationY);
    },
    onEnd: ({ velocityX, velocityY }) => {
      // x.value = withSpring(0, {
      //   velocity: velocityX,
      // });
      if (y.value >= 0) {
        y.value = withTiming(0);
      }
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <RadialGradient
        width={width}
        height={height}
        cx={"50%"}
        cy={"45%"}
        stops={[
          { offset: "0%", stopColor: lightenGreen },
          { offset: "100%", stopColor: lightGreen },
        ]}
      />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>
          <Animated.Image
            source={{ uri: "https://source.unsplash.com/random/155" }}
            style={[{ height: height / 2, width }, imageStyle]}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
export default Playground;
