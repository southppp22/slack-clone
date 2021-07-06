import React, { useState, useMemo } from "react";
import * as S from "./style";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CloseIcon from "@material-ui/icons/Close";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { SearchOption } from "components";

function Header({
  searchBoxState,
  setSearchBoxState,
  keywords,
  onChange,
  reset,
}) {
  const [user] = useAuthState(auth);
  const [people, setPeople] = useState([]);

  const f = async () => {
    if (keywords === "") {
      reset();
      return;
    }

    const querySnapshots = await db
      .collection("users")
      .where("id", ">=", keywords)
      .get();

    const result = [];

    querySnapshots.forEach((doc) => {
      if (result.length > 6) {
        return;
      }
      result.push(doc.data());
    });
    const exceptMe = result.filter((el) => el.email !== user.email);

    setPeople(exceptMe);
  };

  useMemo(() => f(), [keywords]);

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
        {searchBoxState ? (
          <S.HeaderSearchDrobBox>
            <S.HeaderSearchDrobBoxTop>
              <SearchIcon />
              <input
                placeholder="What do you want to search for today?"
                onChange={(e) => onChange(e)}
                name="keywords"
                value={keywords}
              />
              <CloseIcon onClick={() => setSearchBoxState(false)} />
            </S.HeaderSearchDrobBoxTop>
            <S.HeaderSearchDrobBoxBottom>
              {people.length > 0 ? (
                people?.map((person) => {
                  const { id, photoURL } = person;
                  return (
                    <SearchOption
                      id={id}
                      key={id}
                      photoURL={photoURL}
                    ></SearchOption>
                  );
                })
              ) : (
                <></>
              )}
            </S.HeaderSearchDrobBoxBottom>
          </S.HeaderSearchDrobBox>
        ) : (
          <input
            placeholder="Search anything"
            onClick={() => setSearchBoxState(true)}
          />
        )}
      </S.HeaderSearch>

      <S.HeaderRight>
        <HelpOutlineIcon />
      </S.HeaderRight>
    </S.HeaderContainer>
  );
}

export default Header;
