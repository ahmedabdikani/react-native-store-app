import * as React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Input from "../../components/input/Input";

import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import { Sizes } from "../../constants/Styles";
import { View } from "../../components/theme";
import useHideBottomBar from "../../hooks/useHideBottomBar";
import { useChatContext } from "../../context/chat/ChatContext";
import ListFlat from "../../components/list/ListFlat";
import { ButtonText, Subtitle1 } from "../../components/typography";
import { BottomTabParamList } from "../../types/BottomTab";

const spacing = Sizes.spacing.s;

interface ContactProps {}

const Contacts: React.FC<ContactProps> = ({}) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<
    NavigationProp<BottomTabParamList, "ChatStack">
  >();
  const { searchUser, createRoom } = useChatContext();
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState<any[]>([]);

  React.useEffect(() => {
    const unSubscribe = useHideBottomBar(navigation);
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <Container style={{ paddingTop: top + spacing }}>
      <View
        card
        flexR
        style={{
          padding: spacing,
          borderRadius: spacing,
          alignItems: "center",
        }}
      >
        <Input
          onChangeText={(text) => setValue(text)}
          placeholder={"search here..."}
          style={{ flex: 1 }}
        />
        <Button
          disabled={!value.length}
          onPress={async () => {
            searchUser(value, (data, error) => {
              if (error) {
                console.log(error);
                return;
              }
              if (data) {
                setResult(data);
              }
            });
          }}
        >
          <ButtonText>Search</ButtonText>
        </Button>
      </View>

      <ListFlat data={result}>
        {({ item: user }) => {
          return (
            <Button
              onPress={() => {
                createRoom(user);
              }}
            >
              <Subtitle1 style={{ margin: 20 }}>{user.name}</Subtitle1>
            </Button>
          );
        }}
      </ListFlat>
    </Container>
  );
};
export default Contacts;
