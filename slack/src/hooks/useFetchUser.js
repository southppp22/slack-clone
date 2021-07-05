import React, { useRef, useReducer, useMemo, useCallback } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

function useFetchUser() {
  const [authInfo] = useAuthState(auth);
  const [userSnapShot] = useDocument(
    authInfo && db.collection("users").doc(authInfo.uid)
  );
  const userInfo = { uid: authInfo?.uid, id: userSnapShot?.data().id };

  return userInfo;
}

export default useFetchUser;
