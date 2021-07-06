import React, { useEffect, useRef } from "react";
import * as S from "./style";
import { useSelector } from "react-redux";
import { selectRoomId } from "features/appSlice";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AddIcon from "@material-ui/icons/Add";
import { ChatInput } from "components";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { Message } from "components";
import generateTitle from "common/utils/generateTitle";
import { useFetchUser } from "hooks";
import firebase from "firebase";

function Chat({ setSearchBoxState }) {
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

  //1. invite friend를 클릭하면 header searchbox를 오픈
  //2. searchbox앞에는 "invite channelName"이라는 블럭이 들어감
  //3. 원하는 사용자를 찾아 클릭하게 되면 채널에 초대
  const inviteFriend = (user) => {
    db.collection("rooms")
      .doc(roomId)
      ?.update({
        users: firebase.firestore.FieldValue.arrayUnion(user),
      });
  };

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
              {roomDetails?.type === "DM" ? (
                <p>
                  <InfoOutlinedIcon /> Details
                </p>
              ) : (
                <p onClick={() => setSearchBoxState(true)}>
                  <AddIcon /> Invite friend
                </p>
              )}
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
