import * as React from "react";
import { Camera as DefaultCamera, CameraProps } from "expo-camera";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/core";

import View from "../theme/View";
import Body2 from "../typography/Body2";

const Camera: React.FC<CameraProps> = ({ children, ...props }) => {
  const [type] = React.useState(DefaultCamera.Constants.Type.back);
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );

  const ref = React.useRef<React.LegacyRef<DefaultCamera>>();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    (async () => {
      const { status } = await DefaultCamera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return null;
  }
  if (hasPermission === false) {
    return <Body2>No access to camera</Body2>;
  }

  return (
    <View style={styles.constainer}>
      {isFocused && (
        <DefaultCamera ref={ref} style={styles.camera} type={type} {...props}>
          {children}
        </DefaultCamera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default Camera;
