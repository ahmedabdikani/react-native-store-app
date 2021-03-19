import { NavigationProp } from "@react-navigation/core";

const useHideBottomBar = (navigation:NavigationProp<any>)=> {
  
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