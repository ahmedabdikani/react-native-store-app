import * as React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Avatar from "../../components/Avatar";
import { CardView, Text, View, TextSec } from "../../components/Theme";
import useThemeColor from "../../hooks/useThemeColor";
import { lightBlue, tintColorLight } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Fonts, Sizes } from "../../constants/Styles";
import { useAuthContext } from "../../context/AuthContext";
import User from "../../types/User";
import { ProfileScreenProps } from "types/Profile";
import Button from "../../components/button/Button";
import { useNavigation } from "@react-navigation/core";

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

  const renderThemeOptions = () => {
    return (
      <CardView
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
        <CardView
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
        <CardView
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
              ></Button>
            );
          })}
        </CardView>
      </CardView>
    );
  };

  if (!user) {
    return null;
  }

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
    <View
      style={{
        marginTop: padding * 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        onPress={() => navigation.navigate("Favorite")}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Text>308</Text>
        <TextSec>stars</TextSec>
      </Button>
      <Button
        onPress={() => navigation.navigate("FollowedStores")}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Text>10</Text>
        <TextSec>Follwed stores</TextSec>
      </Button>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>236</Text>
        <TextSec>Recently seen</TextSec>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>0</Text>
        <TextSec>Red Backets</TextSec>
      </View>
    </View>
  );
};

const renderMyOrders = () => {
  return (
    <CardView
      style={{ marginTop: padding * 2, padding, borderRadius: padding }}
    >
      <Text style={Fonts.h4}>My orders</Text>
      <CardView
        style={{
          marginTop: padding,
          borderBottomColor: "#ddd",
          marginHorizontal: -padding,
          borderBottomWidth: 1,
        }}
      ></CardView>

      <CardView
        style={{
          marginVertical: padding,
          flexDirection: "row",
          // marginLeft: padding,
        }}
      >
        <CardView
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="account-balance-wallet"
            size={24}
            color={tintColorLight}
          />
          <TextSec style={Fonts.body3}>Paying</TextSec>
        </CardView>
        <CardView
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="account-balance-wallet"
            size={24}
            color={tintColorLight}
          />
          <TextSec style={Fonts.body3}>Shiping</TextSec>
        </CardView>

        <CardView style={{ width: "20%", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="truck-delivery"
            size={24}
            color={tintColorLight}
          />
          <TextSec style={Fonts.body3}>delivering</TextSec>
        </CardView>
        <CardView style={{ width: "20%", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="comment-processing"
            size={24}
            color={tintColorLight}
          />
          <TextSec style={Fonts.body3}>Feedback</TextSec>
        </CardView>
        <CardView style={{ width: "20%", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="credit-card-refund"
            size={24}
            color={tintColorLight}
          />
          <TextSec style={Fonts.body3}>Refund</TextSec>
        </CardView>
      </CardView>
      <View style={{ padding, borderRadius: padding }}>
        <Text style={{ marginBottom: padding * 0.5, ...Fonts.body2 }}>
          Recent order
        </Text>
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
            <TextSec numberOfLines={1}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
              nisi reprehenderit sequi commodi laborum reiciendis aliquid
              corporis laboriosam
            </TextSec>
          </View>
        </View>
      </View>
    </CardView>
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
    <View>
      <View
        style={{
          alignSelf: "flex-end",
          width: "40%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: Sizes.base,
        }}
      >
        <Ionicons name="person-outline" size={24} color={color} />
        <Button onPress={() => setOpenTheme((openTheme) => !openTheme)}>
          <Ionicons name="color-palette-outline" size={24} color={color} />
        </Button>
        <Button onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={24} color={color} />
        </Button>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CardView style={{ padding: padding * 0.2, borderRadius: 100 }}>
          <Avatar imageUri={user.photoUrl} initial={user.name} />
        </CardView>
        <View style={{ marginLeft: padding, flexDirection: "row" }}>
          {/* <TextSec style={Fonts.h3}>User id:</TextSec> */}
          <TextSec style={Fonts.h3}>{user.name}</TextSec>
        </View>
      </View>
    </View>
  );
};

const renderPaymentMethods = () => {
  return (
    <CardView
      style={{
        marginTop: Sizes.base * 2,
        padding: Sizes.base,
        borderRadius: padding,
        minHeight: 200,
      }}
    >
      <Text style={Fonts.h4}>Payment Methods</Text>
      <CardView
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      >
        <TextSec style={Fonts.body2}>
          Currently no payment method is available
        </TextSec>
      </CardView>
    </CardView>
  );
};

export default Profile;
