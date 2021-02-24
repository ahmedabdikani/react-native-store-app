import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorage = ()=> {
  const getItem = async (key:string) => {
    try {
      
      const data = await AsyncStorage.getItem(key)
      if(!data){
        return null
      }
      return JSON.parse(data);
    } catch (error) {
      throw new Error(error)
    } 
  };

  const setItem = async <T extends {} | string>(key:string, item:T)=> {

    try {
      await AsyncStorage.setItem(key,JSON.stringify(item))
    } catch (error) {
      throw new Error(error)
    }

  }

  const removeItem = async (key:string)=> {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      throw new Error(error)
    }
  }

  return {getItem, setItem, removeItem}
}

export default useAsyncStorage