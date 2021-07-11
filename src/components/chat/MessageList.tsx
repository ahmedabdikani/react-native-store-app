import React, { useRef, useEffect, useLayoutEffect } from "react";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import MaskedView from "@react-native-community/masked-view";

// import ListFlat from "../list/ListFlat";
import { useAuthContext } from "../../context/auth";
import AudioMessage from "./AudioMessage";
import ListAnimated from "../list/ListAnimated";
import TextMessage from "./TextMessage";
import VideoMessage from "./VideoMessage";
import { FlatList } from "react-native-gesture-handler";
import ListSmall from "../list/ListSmall";
import { View } from "../theme";
import LinearGradient from "../gradient/LinearGradient";

const MessageList = ({ chats }) => {
  const { user } = useAuthContext();
  const ref = useRef<FlatList<any>>();
  const y = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset, contentSize, layoutMeasurement }) => {
      console.log(contentSize, contentOffset);
      y.value = contentOffset.y;
    },
  });

  const maskElementPosition = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -y.value }],
    };
  });

  useEffect(() => {
    ref.current?.scrollToEnd();
  });

  // useLayoutEffect(() => {
  //   ref.current?.scrollToEnd();
  // });

  return (
    <MaskedView
      maskElement={
        <Animated.View style={[maskElementPosition]}>
          {
            <ListSmall data={chats}>
              {({ item, index }) => {
                const reverse = item?.sent_by === user?.id;
                switch (item?.type) {
                  case "text":
                    return (
                      <View transparent key={index}>
                        <TextMessage
                          maskElement={true}
                          reverse={reverse}
                          message={item}
                        />
                      </View>
                    );
                  case "audio":
                    return <AudioMessage />;
                  case "video":
                    return <VideoMessage />;
                  default:
                    return null;
                }
              }}
            </ListSmall>
          }
        </Animated.View>
      }
    >
      <ListAnimated
        contentContainerStyle={{ paddingBottom: 10 }}
        onContentSizeChange={({}) => {
          ref.current?.scrollToEnd();
        }}
        onScroll={onScroll}
        data={chats}
        style={{ zIndex: 10 }}
      >
        {({ item, index }) => {
          const reverse = item?.sent_by === user?.id;
          switch (item?.type) {
            case "text":
              return (
                <View transparent>
                  <TextMessage
                    maskElement={false}
                    reverse={reverse}
                    message={item}
                  />
                </View>
              );
            case "audio":
              return <AudioMessage />;
            case "video":
              return <VideoMessage />;
            default:
              return null;
          }
        }}
      </ListAnimated>
      <View style={{ position: "absolute", zIndex: 5 }}>
        <LinearGradient />
      </View>
    </MaskedView>
  );
};

export default MessageList;
