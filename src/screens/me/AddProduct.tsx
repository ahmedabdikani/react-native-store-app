import React from "react";

import { View } from "../../components/theme";
import { Subtitle1, ButtonText } from "../../components/typography";
import Input from "../../components/input/Input";
import { Sizes } from "../../constants/Styles";
import Button from "../../components/button/Button";
import { Center } from "../../components/center";

const {
  spacing: { s, m },
} = Sizes;

interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = ({}) => {
  return (
    <View style={{ padding: s }}>
      <View card style={{ padding: s, borderRadius: s }}>
        <Set title={"title"} />
        <Set title={"description"} />
      </View>
      <View
        card
        style={{ padding: s, borderRadius: s, minHeight: 200, marginTop: s }}
      >
        <Subtitle1>images</Subtitle1>
        <Center>
          <Button
            style={{
              borderRadius: s,
              borderWidth: 1,
              padding: s,
              borderColor: "#ddd",
            }}
          >
            <Subtitle1>Add an image</Subtitle1>
          </Button>
        </Center>
      </View>
      <View card style={{ padding: s, borderRadius: s, marginTop: s }}>
        {/* <Subtitle1>pricing</Subtitle1> */}
        <View transparent row>
          <View transparent style={{ flex: 0.5, marginRight: s }}>
            <Set title={" price"} />
          </View>
          <View transparent style={{ flex: 0.5 }}>
            <Set title={" compare price"} />
          </View>
        </View>
      </View>
      <View style={{ padding: s }}>
        <Button
          primary
          style={{ padding: m, alignItems: "center", borderRadius: s }}
        >
          <ButtonText style={{ color: "#fff" }}>Add Product</ButtonText>
        </Button>
      </View>
    </View>
  );
};

const Set = ({ title }: { title: string }) => {
  return (
    <View transparent>
      <Subtitle1 style={{ marginBottom: s }}>{title.toUpperCase()}</Subtitle1>
      <View transparent row>
        <Input
          numberOfLines={1}
          style={{
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: s,
            padding: s,
          }}
          placeholder={"Enter prodcut" + title}
        />
      </View>
    </View>
  );
};

export default AddProduct;
