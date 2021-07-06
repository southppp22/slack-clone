import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import React from "react";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import { enterRoom } from "features/appSlice";
import { useFetchUser } from "hooks";
import { selectRoomId } from "features/appSlice";
import firebase from "firebase";

function SearchOption({ id, photoURL }) {
  const dispatch = useDispatch();

  const u = useFetchUser();

  const [user] = useCollection(db.collection("users").where("id", "==", id));

  //custom hooks 필요
  const [DMRoom] = useCollection(
    db.collection("rooms").where("users", "array-contains", u.uid)
  );

  const generateDM = async () => {
    const userId = user?.docs.map((doc) => doc.id)[0];
    const userInfo = user?.docs.map((doc) => doc.data())[0];

    const roomInfo = DMRoom?.docs.filter((doc) => {
      const { users, type } = doc.data();
      if (type === "DM" && users.includes(userId)) {
        return true;
      }
      return false;
    })[0];

    if (!roomInfo) {
      db.collection("rooms").add({
        name: `${u.id},${userInfo.id}`,
        users: [u.uid, userId],
        type: "DM",
      });
    } else {
      dispatch(
        enterRoom({
          roomId: roomInfo.id,
        })
      );
    }
  };

  const roomId = useSelector(selectRoomId);
  const [roomSnapShot] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const roomDetails = roomSnapShot?.data();

  const inviteFriend = () => {
    const userId = user?.docs.map((doc) => doc.id)[0];
    db.collection("rooms")
      .doc(roomId)
      ?.update({
        users: firebase.firestore.FieldValue.arrayUnion(userId),
      });
  };

  return (
    <S.searchOptionContainer
      onClick={
        roomDetails && roomDetails?.type === "channel"
          ? inviteFriend
          : generateDM
      }
    >
      <img src={photoURL}></img>
      <h4>{id}</h4>
    </S.searchOptionContainer>
  );
}

export default SearchOption;
