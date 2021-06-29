import React, { useState } from "react";
import { Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View } from "../../components/theme";
import { Subtitle1, ButtonText } from "../../components/typography";
import Input from "../../components/input/Input";
import { Sizes } from "../../constants/Styles";
import Button from "../../components/button/Button";
import { Center } from "../../components/center";
import useImagePicker from "../../hooks/useImagePicker";
import { Product } from "../../types/Product";
import { tintColorLight } from "../../constants/Colors";
import { useProductContext } from "../../context/product";

const {
  spacing: { s, m },
} = Sizes;
const imagePreviewSize = 100;

interface CreateProductProps {}

const CreateProduct: React.FC<CreateProductProps> = ({}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [images, setImages] = useState([]);
  const { pickImage } = useImagePicker();
  const { createProduct } = useProductContext();

  const onCreate = () => {
    const product = { price, images, description, title, comparePrice };
    console.log(product);
    createProduct(product);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: s }}>
      <View card style={{ padding: s, borderRadius: s }}>
        <Set title={"title"} setValue={setTitle} />
      </View>
      <View card style={{ padding: s, borderRadius: s, marginTop: s }}>
        <Set title={"description"} setValue={setDescription} />
      </View>

      <View
        card
        style={{ padding: s, borderRadius: s, minHeight: 200, marginTop: s }}
      >
        <Subtitle1>images</Subtitle1>
        <View row transparent style={{ padding: s }}>
          {images.map((image, index) => (
            <View
              key={index}
              transparent
              style={{ overflow: "hidden", borderRadius: s }}
            >
              <Image
                style={{
                  marginRight: m,
                  width: imagePreviewSize,
                  height: imagePreviewSize,
                  borderRadius: s,
                }}
                source={{ uri: image.uri }}
              />
              <Button
                style={{
                  position: "absolute",
                  left: -0,
                  top: -40,
                  height: 100,
                  backgroundColor: "#666",
                  transform: [{ rotate: "45deg" }],
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setImages((prev) => prev.filter((i) => i.uri !== image.uri));
                }}
              >
                <Ionicons
                  style={{ transform: [{ rotate: "-45deg" }] }}
                  name="close-sharp"
                  size={20}
                  color="red"
                />
              </Button>
            </View>
          ))}
        </View>
        <Center>
          <Button
            onPress={() => {
              pickImage()
                .then((image) => {
                  console.log(image);
                  setImages((prev) => [...prev, image]);
                  console.log(images);
                })
                .catch((error) => console.log(error));
            }}
            disabled={images.length > 2}
            style={{
              borderRadius: s,
              borderWidth: 1,
              padding: s,
              borderColor: tintColorLight,
            }}
          >
            <ButtonText>Pick an image</ButtonText>
          </Button>
        </Center>
      </View>
      <View card style={{ padding: s, borderRadius: s, marginTop: s }}>
        <View transparent row>
          <View transparent style={{ flex: 0.5, marginRight: s }}>
            <Set title={" price"} setValue={setPrice} />
          </View>
          <View transparent style={{ flex: 0.5 }}>
            <Set title={" compare price"} setValue={setComparePrice} />
          </View>
        </View>
      </View>
      <View style={{ padding: s }}>
        <Button
          disabled={!price.length}
          onPress={onCreate}
          primary
          style={{ padding: m, alignItems: "center", borderRadius: s }}
        >
          <ButtonText style={{ color: "#fff" }}>create Product</ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
};

const Set = ({ title, setValue }: { title: string }) => {
  return (
    <View transparent>
      <Subtitle1 style={{ marginBottom: s }}>{title.toUpperCase()}</Subtitle1>
      <View transparent row>
        <Input
          onChangeText={(text) => setValue(text)}
          numberOfLines={1}
          style={{
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: s,
            padding: s,
          }}
          placeholder={"Enter " + title}
        />
      </View>
    </View>
  );
};

export default CreateProduct;
