import * as React from "react";
import { Image } from "react-native";

import { Sizes } from "../../constants/Styles";
import { Card, Text } from "../theme";
import { H4 } from "../typography";

const spacing = Sizes.base;

const CommentItem = ({ comment }) => {
  return (
    <Card style={{ marginTop: spacing }}>
      <Card style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: comment.user.photo }}
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
            borderRadius: 50,
          }}
        />
        <Card style={{ marginLeft: spacing * 0.5 }}>
          <H4>{comment.user.name}</H4>
          <Text>5 days ago</Text>
        </Card>
      </Card>
      <Card
        style={{ marginVertical: spacing * 0.5, marginHorizontal: spacing }}
      >
        <Text secondary numberOfLines={2}>
          {comment.title}
        </Text>
      </Card>
    </Card>
  );
};

export default CommentItem;
