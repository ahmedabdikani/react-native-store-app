import * as React from "react";
import { Image } from "react-native";

import Button from "../../components/button/Button";

interface CarouselItemProps {
  uri: string;
  width: number;
  height: number;
  openModel: (uri: string) => void;
}

const CarouselItem = ({ uri, height, width, openModel }: CarouselItemProps) => {
  return (
    <Button style={{ opacity: 1 }} onPress={() => openModel(uri)}>
      <Image style={[{ width, height }]} source={{ uri }} />
    </Button>
  );
};

export default CarouselItem;
