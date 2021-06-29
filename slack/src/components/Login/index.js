import React from "react";
import * as S from "./style";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
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
