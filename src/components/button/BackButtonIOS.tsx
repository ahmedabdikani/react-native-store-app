import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import BackButton from "./BackButton";

const BackButtonIos: React.FC = () => {
  return (
    <BackButton>
      {(color: string) => {
        return <Ionicons name="ios-chevron-back" size={24} color={color} />;
      }}
    </BackButton>
  );
};

export default BackButtonIos;
