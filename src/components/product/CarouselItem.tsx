import * as React from "react";
import { useNavigation } from "@react-navigation/core";
import Animated from "react-native-reanimated";

import Button from "../../components/button/Button";

interface CarouselItemProps {
  uri: string;
  width: number;
  height: number;
}

const CarouselItem = ({ uri, height, width }: CarouselItemProps) => {
  const navigation = useNavigation();

  return (
    <Button onPress={() => navigation.navigate("ViewContent", { uri })}>
      <Animated.Image style={[{ width, height }]} source={{ uri }} />
    </Button>
  );
};

export default CarouselItem;
