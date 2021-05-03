import { useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';


const useImagePicker = ()=> {
  useEffect(() => {
    (async () => {    
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log('Sorry, we need camera roll permissions to make this work!');
        }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      return result
    }else{
      throw new Error("cancelled") 
    }
  };

  const snapImage = async ()=>{
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      return result.uri
    }else{
      throw new Error("cancelled") 
    }
  }

  return {snapImage, pickImage}

}

export default useImagePicker