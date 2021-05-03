import React from "react";
import { Image } from "react-native";

import { Sizes } from "../../constants/Styles";
import { View } from "../theme";
import { Body2, Caption, Subtitle2 } from "../typography";

const spacing = Sizes.spacing.s;

const CommentItem = ({ comment }: { comment: any }) => {
  return (
    <View card style={{ marginTop: spacing }}>
      <View card style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: comment.user.photo }}
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
            borderRadius: 50,
          }}
        />
        <View card style={{ marginLeft: spacing * 0.5 }}>
          <Subtitle2 style={{ marginBottom: 0 }}>{comment.user.name}</Subtitle2>
          <Caption secondary>5 days ago</Caption>
        </View>
      </View>
      <View
        card
        style={{ marginVertical: spacing * 0.5, marginHorizontal: spacing }}
      >
        <Body2 secondary numberOfLines={2}>
          {comment.title}
        </Body2>
      </View>
    </View>
  );
};

export default CommentItem;
