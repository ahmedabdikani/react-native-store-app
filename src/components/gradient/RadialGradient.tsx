import React from "react";
import { StyleSheet } from "react-native";
import Svg, {
  Defs,
  RadialGradient as RG,
  Rect,
  Stop,
  StopProps,
} from "react-native-svg";

type Stops = StopProps[];

interface RadialGradientProps {
  width?: number;
  height?: number;
  cx: string;
  cy: string;
  stops: Stops;
}

const RadialGradient: React.FC<RadialGradientProps> = ({
  cx,
  cy,
  height,
  width,
  stops,
}) => {
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Defs>
        <RG id="gradient" cx={cx} cy={cy}>
          {stops.map((stop, index) => (
            <Stop key={index} {...stop} />
          ))}
          {/* <Stop offset="100%" stopColor={color} /> */}
        </RG>
      </Defs>
      <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
    </Svg>
  );
};
export default RadialGradient;
