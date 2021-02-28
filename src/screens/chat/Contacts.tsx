import * as React from "react";
import { useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Input from "../../components/input/Input";

import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import Card from "../../components/theme/Card";
import { Sizes } from "../../constants/Styles";
import useHideBottomBar from "../../hooks/useHideBottomBar";
import { useChatContext } from "../../context/ChatContext";
import ListFlat from "../../components/list/ListFlat";
import { H3 } from "../../components/typography";

const spacing = Sizes.base;

interface ContactProps {}

const Contacts: React.FC<ContactProps> = ({}) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { searchUser, createRoom } = useChatContext();
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    const unSubscribe = useHideBottomBar(navigation);
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <Container style={{ paddingTop: top + spacing }}>
      <Card
        style={{
          flexDirection: "row",
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
            const result = await searchUser(value);
            console.log(result);
            setResult(result);
          }}
        >
          <H3>Search</H3>
        </Button>
      </Card>

      <ListFlat data={result}>
        {({ item }) => {
          return (
            <Button
              onPress={() => {
                createRoom(item);
              }}
            >
              <H3 style={{ margin: 20 }}>{item.name}</H3>
            </Button>
          );
        }}
      </ListFlat>
    </Container>
  );
};
export default Contacts;
