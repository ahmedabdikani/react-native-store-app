import * as React from "react";

import View from "../../components/theme/View";
import CameraComponent from "../../components/camera/Camera";

interface CameraProps {}

const Camera: React.FC<CameraProps> = ({}) => {
  return (
    <View style={{ flex: 1 }}>
      <CameraComponent />
    </View>
  );
};
export default Camera;
