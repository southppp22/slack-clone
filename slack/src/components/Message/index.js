import React from "react";
import * as S from "./style";

function Message({ message, timestamp, user, userimage }) {
  return (
    <S.MessageContainer>
      <img src={userimage} alt="" />
      <S.MessageInfo>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </S.MessageInfo>
    </S.MessageContainer>
  );
}

export default Message;
