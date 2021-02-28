import * as React from "react";

import { Sizes } from "../../constants/Styles";
import Button from "../button/Button";
import ListSmall from "../list/ListSmall";
import { Card } from "../theme";
import { H4, H3 } from "../typography";
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
      <Card style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <H3>Comments</H3>
        <Button>
          <H4 primary underline>
            See more
          </H4>
        </Button>
      </Card>
      <ListSmall data={comments}>
        {({ item, index }) => <CommentItem comment={item} key={index} />}
      </ListSmall>
    </Card>
  );
};

export default CommentList;
