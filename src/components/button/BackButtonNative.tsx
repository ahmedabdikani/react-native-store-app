import * as React from "react";
import { Platform } from "react-native";

import BackButtonAndroid from "./BackButtonAndroid";
import BackButtonIos from "./BackButtonIOS";

const BackButtonNative: React.FC = () =>
  Platform.OS === "android" ? <BackButtonAndroid /> : <BackButtonIos />;

export default BackButtonNative;
