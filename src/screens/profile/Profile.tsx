import * as React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Avatar from "../../components/Avatar";
import { Card, View, Center } from "../../components/theme";
import useThemeColor from "../../hooks/useThemeColor";
import { lightBlue, tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Fonts, Sizes, Styles } from "../../constants/Styles";
import { useAuthContext } from "../../context/AuthContext";
import User from "../../types/User";
import { ProfileScreenProps } from "../../types/Profile";
import Button from "../../components/button/Button";
import { useNavigation } from "@react-navigation/core";
import { Body1, Body2, Subtitle1 } from "../../components/typography";

const { width } = Layout.window;
const padding = Sizes.base;

interface ProfileProps extends ProfileScreenProps<"Profile"> {}

const colors = [
  "#213970",
  "#ffe042",
  "#5b0e2d",
  "#f2bc94",
  "#6dd47e",
  "#ed33f5",
];

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const card = useThemeColor({}, "card");
  const { top } = useSafeAreaInsets();
  const { user } = useAuthContext();
  const [openTheme, setOpenTheme] = React.useState(false);

  if (!user) {
    return null;
  }

  const renderThemeOptions = () => {
    return (
      <Card
        style={{
          position: "absolute",
          height: 200,
          width: 200,
          zIndex: 10,
          left: width / 2 - 5,
          top: top + 20,
          paddingTop: padding,
          borderRadius: padding,
        }}
      >
        <Card
          style={{
            backgroundColor: "transparent",
            height: 10,
            width: 10,
            position: "absolute",
            left: width / 4,
            top: -20,
            borderLeftColor: "transparent",
            borderLeftWidth: 20,
            borderRightColor: "transparent",
            borderRightWidth: 20,
            borderBottomColor: card,
            borderBottomWidth: 20,
          }}
        />
        <Card
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            padding,
            alignItems: "center",
          }}
        >
          {colors.map((color, index) => {
            return (
              <Button
                onPress={() => null}
                key={index}
                style={{
                  backgroundColor: color,
                  width: 50,
                  height: 50,
                  marginLeft: padding,
                  marginBottom: padding,
                  borderRadius: padding,
                }}
              />
            );
          })}
        </Card>
      </Card>
    );
  };

  return (
    <View style={{ padding, paddingTop: top, flex: 1 }}>
      {renderHeader({ user, setOpenTheme })}
      {openTheme && renderThemeOptions()}
      {renderSelection()}
      {renderMyOrders()}
      {renderPaymentMethods()}
    </View>
  );
};

const renderSelection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.selectionContainer}>
      <Button
        onPress={() => navigation.navigate("Favorite")}
        style={Styles.centerHV}
      >
        <Body2>308</Body2>
        <Body2 secondary>stars</Body2>
      </Button>
      <Button
        onPress={() => navigation.navigate("FollowedStores")}
        style={Styles.centerHV}
      >
        <Body2>10</Body2>
        <Body2 secondary>Follwed stores</Body2>
      </Button>
      <View style={Styles.centerHV}>
        <Body2>236</Body2>
        <Body2 secondary>Recently seen</Body2>
      </View>
      <View style={Styles.centerHV}>
        <Body2>0</Body2>
        <Body2 secondary>Red Backets</Body2>
      </View>
    </View>
  );
};

const renderMyOrders = () => {
  return (
    <Card style={{ marginTop: padding * 2, padding, borderRadius: padding }}>
      <Subtitle1>My orders</Subtitle1>
      <Card
        style={{
          marginVertical: padding,
          flexDirection: "row",
        }}
      >
        <Card style={styles.selection_item}>
          <MaterialIcons
            name="account-balance-wallet"
            size={24}
            color={tintColorLight}
          />
          <Body2 secondary style={Fonts.body2}>
            Paying
          </Body2>
        </Card>
        <Card style={styles.selection_item}>
          <MaterialIcons
            name="account-balance-wallet"
            size={24}
            color={tintColorLight}
          />
          <Body2 secondary style={Fonts.body2}>
            Shiping
          </Body2>
        </Card>

        <Card style={styles.selection_item}>
          <MaterialCommunityIcons
            name="truck-delivery"
            size={24}
            color={tintColorLight}
          />
          <Body2 secondary style={Fonts.body2}>
            delivering
          </Body2>
        </Card>
        <Card style={styles.selection_item}>
          <MaterialCommunityIcons
            name="comment-processing"
            size={24}
            color={tintColorLight}
          />
          <Body2 secondary style={Fonts.body2}>
            Feedback
          </Body2>
        </Card>
        <Card style={styles.selection_item}>
          <MaterialCommunityIcons
            name="credit-card-refund"
            size={24}
            color={tintColorLight}
          />
          <Body2 secondary style={Fonts.body2}>
            Refund
          </Body2>
        </Card>
      </Card>
      <View style={{ padding, borderRadius: padding }}>
        <Body2 style={{ marginBottom: padding * 0.5, ...Fonts.body2 }}>
          Recent order
        </Body2>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "cover",
            }}
            source={{ uri: "https://source.unsplash.com/random/200" }}
          />
          <View style={{ marginLeft: padding, flex: 1 }}>
            <MaterialCommunityIcons
              size={24}
              name={"truck-delivery-outline"}
              color={lightBlue}
            />
            <Body2 secondary numberOfLines={1}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
              nisi reprehenderit sequi commodi laborum reiciendis aliquid
              corporis laboriosam
            </Body2>
          </View>
        </View>
      </View>
    </Card>
  );
};

const renderHeader = ({
  user,
  setOpenTheme,
}: {
  setOpenTheme: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}) => {
  const color = useThemeColor({}, "text");
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.headerContainer}>
        <Ionicons name="person-outline" size={24} color={color} />
        <Button onPress={() => setOpenTheme((openTheme) => !openTheme)}>
          <Ionicons name="color-palette-outline" size={24} color={color} />
        </Button>
        <Button onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={24} color={color} />
        </Button>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Card style={{ padding: padding * 0.2, borderRadius: 100 }}>
          <Avatar imageUri={user.photoUrl} initial={user.name} />
        </Card>
        <View style={{ marginLeft: padding, flexDirection: "row" }}>
          <Subtitle1 secondary>User id: </Subtitle1>
          <Subtitle1>{user.name}</Subtitle1>
        </View>
      </View>
    </>
  );
};

const renderPaymentMethods = () => {
  return (
    <Card
      style={{
        marginTop: Sizes.base * 2,
        padding: Sizes.base,
        borderRadius: padding,
        minHeight: 200,
      }}
    >
      <Subtitle1>Payment Methods</Subtitle1>
      <Card style={Styles.flex}>
        <Center>
          <Body1 secondary>Currently no payment method is available</Body1>
        </Center>
      </Card>
    </Card>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignSelf: "flex-end",
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Sizes.base,
  },
  selectionContainer: {
    marginTop: padding * 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selection_item: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
