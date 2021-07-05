import React, { useState } from "react";
import * as S from "./style";
import { useCollection } from "react-firebase-hooks/firestore";
import { SidebarOption } from "components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import AddIcon from "@material-ui/icons/Add";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import generateTitle from "common/utils/generateTitle";
import { useFetchUser } from "hooks";

function Sidebar() {
  const [isFold, setIsFold] = useState([true, true]);
  const [user] = useAuthState(auth);
  const { id } = useFetchUser();

  const foldChannel = (idx) => {
    const copy = [...isFold];
    copy[idx] = !copy[idx];
    setIsFold(copy);
  };

  const [channels] = useCollection(
    db.collection("rooms").where("users", "array-contains", user.uid)
  );

  const channlList = channels?.docs
    .filter((doc) => {
      const { type } = doc.data();
      if (type === "channel") {
        return true;
      }
      return false;
    })
    .map((doc) => (
      <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
    ));

  const [DMRoom] = useCollection(
    db.collection("rooms").where("users", "array-contains", user.uid)
  );

  const DMRoomList = DMRoom?.docs
    .filter((doc) => {
      const { type } = doc.data();
      if (type === "DM") {
        return true;
      }
      return false;
    })
    .map((doc) => {
      const title = doc.data().name;
      const DMTitle = generateTitle(id, title);
      return <SidebarOption key={doc.id} id={doc.id} title={DMTitle} />;
    });

  return (
    <S.SidebarContainer>
      <S.SidebarHeader>
        <S.SidebarInfo>
          <h2>slack clone</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </S.SidebarInfo>
        <CreateIcon />
      </S.SidebarHeader>

      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ArrowDropUpIcon} title="Show less" />
      <hr />
      {isFold[0] ? (
        <>
          <SidebarOption
            Icon={ArrowRightIcon}
            title="Channels"
            fold={foldChannel.bind(null, 0)}
          />
        </>
      ) : (
        <>
          <SidebarOption
            Icon={ArrowDropDownIcon}
            title="Channels"
            fold={foldChannel.bind(null, 0)}
          />
          {channlList}
          <SidebarOption Icon={AddIcon} addChannelOption title="Add Channels" />
        </>
      )}
      <hr />
      {isFold[1] ? (
        <>
          <SidebarOption
            Icon={ArrowRightIcon}
            title="Direct messages"
            fold={foldChannel.bind(null, 1)}
          />
        </>
      ) : (
        <>
          <SidebarOption
            Icon={ArrowDropDownIcon}
            title="Channels"
            fold={foldChannel.bind(null, 1)}
          />
          {DMRoomList}
        </>
      )}
    </S.SidebarContainer>
  );
}

export default Sidebar;
