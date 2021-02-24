import * as React from "react";
import { useAuthContext } from "../../context/AuthContext";

import ListFlat from "../list/ListFlat";
import AudioMessage from "./AudioMessage";
import TextMessage from "./TextMessage";
import VideoMessage from "./VideoMessage";

const MessageList = ({ chats, member }) => {
  const { user } = useAuthContext();

  return (
    <ListFlat data={chats}>
      {({ item, index }) => {
        const reverse = !(item?.sentBy === user?.id);
        const sender = item?.sentBy == user?.id ? user : member;
        switch (item?.message?.type) {
          case "text":
            return (
              <TextMessage sender={sender} reverse={reverse} message={item} />
            );
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
