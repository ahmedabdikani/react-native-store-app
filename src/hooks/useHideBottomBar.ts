import { NavigationProp } from "@react-navigation/core";
import { BottomTabParamList } from "../types/BottomTab";

const useHideBottomBar = (navigation:NavigationProp<BottomTabParamList, keyof BottomTabParamList>)=> {
  
  const parent = navigation.dangerouslyGetParent();
  parent?.setOptions({
    tabBarVisible: false,
  });

  return () => {
    parent?.setOptions({
        tabBarVisible: true,
      });
    };
}

export default useHideBottomBar