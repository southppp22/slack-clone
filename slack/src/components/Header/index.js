import React from "react";
import * as S from "./style";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <S.HeaderContainer>
      <S.HeaderLeft>
        <S.HeaderAvater
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={() => auth.signOut()}
        />
        <AccessTimeIcon />
      </S.HeaderLeft>

      <S.HeaderSearch>
        <SearchIcon />
        <input placeholder="Search anything" />
      </S.HeaderSearch>

      <S.HeaderRight>
        <HelpOutlineIcon />
      </S.HeaderRight>
    </S.HeaderContainer>
  );
}

export default Header;
