import { NavigationProp } from "@react-navigation/core";
import { BottomTabParamList } from "src/types/BottomTab";

const useHideBottomBar = (navigation:NavigationProp<BottomTabParamList,any>)=> {
  if(!navigation) return
  
  navigation.setOptions({
    tabBarVisible: false,
  });

  return () => {
    navigation?.setOptions({
        tabBarVisible: true,
      });
    };
}

export default useHideBottomBar