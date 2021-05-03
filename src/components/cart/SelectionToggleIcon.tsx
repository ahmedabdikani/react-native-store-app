import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { tintColorLight } from "../../constants/Colors";
import useThemeColor from "../../hooks/useThemeColor";

interface SelectionToggleIconProps {
  condition: boolean;
}

const SelectionToggleIcon: React.FC<SelectionToggleIconProps> = ({
  condition,
}) => {
  const color = useThemeColor({}, "textSecondary");
  return condition ? (
    <FontAwesome name={"check-circle"} size={20} color={tintColorLight} />
  ) : (
    <FontAwesome name={"circle-o"} size={20} color={color} />
  );
};

export default SelectionToggleIcon;
