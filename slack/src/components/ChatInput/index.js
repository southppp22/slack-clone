import React, { useState } from "react";
import * as S from "./style";
import { Button } from "@material-ui/core";
import { db, auth } from "../../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault(); // prevents refresh

    if (!channelId || input === "") {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userimage: user.photoURL,
    });

    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });

    setInput("");
  };

  return (
    <S.ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage} />
      </form>
    </S.ChatInputContainer>
  );
}

export default ChatInput;
