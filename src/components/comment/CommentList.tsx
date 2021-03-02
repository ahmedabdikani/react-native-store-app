import * as React from "react";

import { Sizes } from "../../constants/Styles";
import Button from "../button/Button";
import ListSmall from "../list/ListSmall";
import { Card } from "../theme";
import { Subtitle1, Subtitle2 } from "../typography";
import CommentItem from "./CommentItem";

const spacing = Sizes.base;

const CommentList = ({ comments }: { comments: any }) => {
  return (
    <Card
      style={{
        padding: spacing,
        borderRadius: spacing,
        marginHorizontal: spacing,
      }}
    >
      <Card
        style={{
          padding: spacing,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Subtitle1>Comments</Subtitle1>
        <Button>
          <Subtitle2 primary underline>
            See more
          </Subtitle2>
        </Button>
      </Card>
      <ListSmall data={comments}>
        {({ item, index }) => <CommentItem comment={item} key={index} />}
      </ListSmall>
    </Card>
  );
};

export default CommentList;
