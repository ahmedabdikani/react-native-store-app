import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import BackButton from "./BackButton";

const BackButtonAndroid: React.FC = () => {
  return (
    <BackButton>
      {(color: string) => {
        return <Ionicons name="arrow-back" size={24} color={color} />;
      }}
    </BackButton>
  );
};

export default BackButtonAndroid;
