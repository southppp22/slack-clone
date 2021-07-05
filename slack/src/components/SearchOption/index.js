import React from "react";
import * as S from "./style";

function SearchOption({ id, photoURL }) {
  return (
    <S.searchOptionContainer>
      <img src={photoURL}></img>
      <h4>{id}</h4>
    </S.searchOptionContainer>
  );
}

export default SearchOption;
