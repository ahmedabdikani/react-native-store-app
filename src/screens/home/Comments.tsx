import React from "react";

import CreateComment from "../../components/comment/CreateComment";
import { View } from "../../components/theme";

interface CommentsProps {}

const Comments: React.FC<CommentsProps> = ({}) => {
  return (
    <View style={{ flex: 1 }}>
      <CreateComment userImage={"ddd"} />
    </View>
  );
};
export default Comments;
