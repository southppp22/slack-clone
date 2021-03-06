import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { Header, Sidebar, Chat, Login } from "components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import Spinner from "react-spinkit";
import { useInputs } from "hooks";

//ToDo
//1. 친구추가
//1.1 친구 접속 상태 확인
//2. DM
//3. 채널초대

function App() {
  const [user, loading] = useAuthState(auth);
  const [{ keywords }, onChange, reset] = useInputs({
    keywords: "",
  });
  const [searchBoxState, setSearchBoxState] = useState(false);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt=""
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header
              searchBoxState={searchBoxState}
              setSearchBoxState={setSearchBoxState}
              keywords={keywords}
              onChange={onChange}
              reset={reset}
            />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat setSearchBoxState={setSearchBoxState} />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
