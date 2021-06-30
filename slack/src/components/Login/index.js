import React from "react";
import * as S from "./style";
import { Button } from "@material-ui/core";
import { auth, provider, db } from "../../firebase";

function Login() {
  const signIn = async (e) => {
    e.preventDefault();

    const {
      user: { uid, displayName, email },
    } = await auth.signInWithPopup(provider);

    const userRef = db.collection("users");
    const doc = await userRef.doc(uid).get();

    if (!doc.exists) {
      userRef.doc(uid).set({ id: uid, name: displayName, email });
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
