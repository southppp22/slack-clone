import React, { useEffect, useRef } from "react";
import * as S from "./style";
import { useSelector } from "react-redux";
import { selectRoomId } from "features/appSlice";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { ChatInput } from "components";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { Message } from "components";
import generateTitle from "common/utils/generateTitle";
import { useFetchUser } from "hooks";

function Chat() {
  const chatRef = useRef(null);
  const user = useFetchUser();
  const roomId = useSelector(selectRoomId);
  const [roomSnapShot] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const roomDetails = roomSnapShot?.data();

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <S.ChatContainer>
      {roomSnapShot && roomMessages && (
        <>
          <S.Header>
            <S.HeaderLeft>
              <h4>
                <strong>
                  #
                  {roomDetails.type === "DM"
                    ? generateTitle(user.id, roomDetails.name)
                    : roomDetails.name}
                </strong>
              </h4>
              <StarBorderOutlinedIcon />
            </S.HeaderLeft>
            <S.HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </S.HeaderRight>
          </S.Header>

          <S.ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userimage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userimage={userimage}
                ></Message>
              );
            })}
            <S.ChatBottom ref={chatRef} />
          </S.ChatMessages>

          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails.name}
            channelId={roomId}
          />
        </>
      )}
    </S.ChatContainer>
  );
}

export default Chat;
