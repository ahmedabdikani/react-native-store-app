import React, { useEffect } from "react";

import useHideBottomBar from "../../hooks/useHideBottomBar";
import { ProfileScreenProps } from "src/types/Profile";
import { View } from "../../components/theme";
import { Subtitle1 } from "../../components/typography";
import { Sizes } from "../../constants/Styles";
import { Image, StyleSheet } from "react-native";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../../components/button/Button";
import useImagePicker from "../../hooks/useImagePicker";
import storage from "../../config/storage";

const spacing = Sizes.base;
const imageHeight = 60;

interface ProfileProps extends ProfileScreenProps<"Profile"> {}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const { user, updateUser } = useAuthContext();
  const { pickImage } = useImagePicker();
  console.log(user?.photoUrl);

  const onPress = () => {
    pickImage()
      .then(async (result) => {
        const storageRef = storage?.ref();
        const res = await fetch(result.uri);
        const blob = await res.blob();

        const imageRef = storageRef?.child("profile/" + user?.id + ".jpg");
        const task = imageRef?.put(blob);

        task?.on(
          "state_changed",
          (res) => {
            console.log("uploaded");
            updateUser({
              photoUrl: `https://firebasestorage.googleapis.com/v0/b/suriapp-2f701.appspot.com/o/profile%2F${user?.id}.jpg?alt=media`,
            });
          },
          (error) => {
            console.log("error", error.message);
          }
        );
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const unSubscripe = useHideBottomBar(navigation);
    return () => {
      unSubscripe();
    };
  });

  return (
    <View style={{ padding: spacing }}>
      <Button onPress={onPress}>
        <View card style={styles.card}>
          <Subtitle1 style={{ flex: 1 }}>Profile Photo</Subtitle1>
          {
            <Image
              style={{
                borderRadius: spacing * 2,
                margin: spacing / 2,
                height: imageHeight * 0.9,
                width: imageHeight * 0.9,
                resizeMode: "cover",
              }}
              source={{ uri: user?.photoUrl }}
            />
          }
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
});

export default Profile;
