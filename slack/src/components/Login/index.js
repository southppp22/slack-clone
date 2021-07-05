import React from "react";
import * as S from "./style";
import { Button } from "@material-ui/core";
import { auth, provider, db } from "../../firebase";
import generateId from "common/utils/generateId";

function Login() {
  const signIn = async (e) => {
    e.preventDefault();

    const {
      user: { uid, displayName, email, photoURL },
    } = await auth.signInWithPopup(provider);

    const userRef = db.collection("users");
    const doc = await userRef.doc(uid).get();

    if (!doc.exists) {
      userRef.doc(uid).set({
        id: await generateId(displayName),
        name: displayName,
        email,
        photoURL,
      });
    }
  };
  return (
    <S.LoginContainer>
      <S.LoginInnerContainer>
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <h1>Sign in to the Slack</h1>
        <p>namin.slack.com</p>

        <Button onClick={(e) => signIn(e)}> Sign in with Google</Button>
      </S.LoginInnerContainer>
    </S.LoginContainer>
  );
}

export default Login;
