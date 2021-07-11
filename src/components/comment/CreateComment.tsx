import React, { useState } from "react";
import Avatar from "../Avatar";
import Button from "../button/Button";
import Input from "../input/Input";
import { View } from "../theme";
import { ButtonText } from "../typography";

interface CreateCommentProps {
  userImage: string;
}

const CreateComment: React.FC<CreateCommentProps> = ({}) => {
  const [comment, setComment] = useState("");

  return (
    <View card row>
      <Avatar initial={"ahmed"} />
      <Input
        placeholder={"Add a comment"}
        onChangeText={(text) => setComment(text)}
      />
      <Button disabled={!comment.length}>
        <ButtonText>Comment</ButtonText>
      </Button>
    </View>
  );
};
export default CreateComment;
