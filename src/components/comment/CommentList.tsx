import React from "react";
import { HomeScreenProps } from "src/types/navigation";

import { Sizes } from "../../constants/Styles";
import Button from "../button/Button";
import ListSmall from "../list/ListSmall";
import { View } from "../theme";
import { Subtitle1, Subtitle2 } from "../typography";
import CommentItem from "./CommentItem";

const spacing = Sizes.spacing.s;

interface CommentListProps {
  navigation: HomeScreenProps<"Product">["navigation"];
  comments: any[];
}

const CommentList: React.FC<CommentListProps> = ({ comments, navigation }) => {
  return (
    <View
      card
      style={{
        padding: spacing,
        borderRadius: spacing,
        marginHorizontal: spacing,
      }}
    >
      <View
        card
        style={{
          padding: spacing,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Subtitle1>Comments</Subtitle1>
        <Button onPress={() => navigation.push("Comments")}>
          <Subtitle2 primary underline>
            See more
          </Subtitle2>
        </Button>
      </View>
      <ListSmall data={comments}>
        {({ item, index }) => <CommentItem comment={item} key={index} />}
      </ListSmall>
    </View>
  );
};

export default CommentList;
