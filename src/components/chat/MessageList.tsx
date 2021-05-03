import React, { useRef, useEffect } from "react";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useAnimatedScrollHandler } from "react-native-reanimated";

// import ListFlat from "../list/ListFlat";
import AudioMessage from "./AudioMessage";
import ListAnimated from "../list/ListAnimated";
import TextMessage from "./TextMessage";
import VideoMessage from "./VideoMessage";
import { FlatList } from "react-native-gesture-handler";

const MessageList = ({ chats }) => {
  const { user } = useAuthContext();
  const ref = useRef<FlatList<any>>().current;

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset, contentSize, layoutMeasurement }) => {
      console.log(contentSize, contentOffset);
    },
  });

  useEffect(() => {
    ref?.scrollToEnd();
  });
  return (
    <ListAnimated
      onContentSizeChange={({}) => {
        ref?.scrollToEnd();
      }}
      onScroll={onScroll}
      data={chats}
    >
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
    </ListAnimated>
  );
};

export default MessageList;
