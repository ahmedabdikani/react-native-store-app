import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

import useHideBottomBar from "../../hooks/useHideBottomBar";
import { ProfileScreenProps } from "src/types/navigation";
import { View } from "../../components/theme";
import { Subtitle1 } from "../../components/typography";
import { Sizes } from "../../constants/Styles";
import { useAuthContext } from "../../context/auth";
import Button from "../../components/button/Button";
import useImagePicker from "../../hooks/useImagePicker";
import storage from "../../config/storage";

const spacing = Sizes.spacing.s;
const imageHeight = 60;

interface ProfileProps extends ProfileScreenProps<"Profile"> {}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const { user, updateUser } = useAuthContext();
  const { pickImage } = useImagePicker();

  const onPress = () => {
    pickImage()
      .then(async (result) => {
        const profileRef = storage?.ref("/profile");
        const res = await fetch(result.uri);
        const blob = await res.blob();

        const extension = blob.type.split("/")[1];

        const imageRef = profileRef?.child(
          `${user?.id}${Date.now()}.${extension}`
        );
        const task = imageRef?.put(blob);
        task?.on(
          "state_changed",
          (res) => console.log("uploaded"),
          (error) => {
            console.log("error", error.message);
          },
          () => {
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log("File available at", downloadURL);
              updateUser({
                photoUrl: downloadURL,
              });
            });
          }
        );
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const unSubscripe = useHideBottomBar(navigation.dangerouslyGetParent());
    return () => {
      unSubscripe && unSubscripe();
    };
  }, [navigation]);

  return (
    <View style={{ padding: spacing }}>
      <Button onPress={onPress}>
        <View card style={styles.card}>
          <Subtitle1 style={{ flex: 1 }}>Profile Photo</Subtitle1>
          <Image style={styles.image} source={{ uri: user?.photoUrl }} />
        </View>
      </Button>
      <View card style={styles.card}>
        <Subtitle1>name</Subtitle1>
        <Subtitle1>{user?.name}</Subtitle1>
      </View>
      <View card style={styles.card}>
        <Subtitle1 style={{ textTransform: "none" }}>ID</Subtitle1>
        <Subtitle1 style={{ flex: 0.6 }} numberOfLines={1}>
          {user?.id}
        </Subtitle1>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    opacity: 0.9,
    flexDirection: "row",
    height: imageHeight,
    alignItems: "center",
    paddingHorizontal: spacing,
    marginBottom: 1,
    justifyContent: "space-between",
  },
  image: {
    borderRadius: spacing * 2,
    margin: spacing / 2,
    height: imageHeight * 0.9,
    width: imageHeight * 0.9,
    resizeMode: "cover",
  },
});

export default Profile;
