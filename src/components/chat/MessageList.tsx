import * as React from "react";
import { useAuthContext } from "../../context/AuthContext";

import ListFlat from "../list/ListFlat";
import AudioMessage from "./AudioMessage";
import TextMessage from "./TextMessage";
import VideoMessage from "./VideoMessage";

const MessageList = ({ chats }) => {
  const { user } = useAuthContext();

  return (
    <ListFlat data={chats} inverted>
      {({ item, index }) => {
        const reverse = item?.sent_by === user?.id;
        switch (item?.type) {
          case "text":
            return <TextMessage reverse={reverse} message={item} />;
          case "audio":
            return <AudioMessage />;
          case "video":
            return <VideoMessage />;
          default:
            return null;
        }
      }}
    </ListFlat>
  );
};

export default MessageList;
