import React from "react";
import * as S from "./style";

//절대경로 적용안됨
import { db, auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "features/appSlice";
import { useAuthState } from "react-firebase-hooks/auth";

function SidebarOption({ Icon, title, addChannelOption, id, fold }) {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
        users: [user.uid],
        type: "channel",
      });
    }
  };

  const SelectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <S.SidebarOptionContainter
      onClick={fold ? fold : addChannelOption ? addChannel : SelectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <S.SidebarOptionChannel>
          <span>#</span> {title}
        </S.SidebarOptionChannel>
      )}
    </S.SidebarOptionContainter>
  );
}

export default SidebarOption;
