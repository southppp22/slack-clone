import React from 'react';
import * as S from './style';
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import SearchIcon from "@material-ui/icons/Search"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"

function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderLeft>
        <S.HeaderAvater 
          // TODO: Add onclick
        />
        <AccessTimeIcon />
      </S.HeaderLeft>

      <S.HeaderSearch >
        <SearchIcon />
        <input placeholder="Search anything"/>
      </S.HeaderSearch >
        
      <S.HeaderRight>
        <HelpOutlineIcon />
      </S.HeaderRight>
      
    </S.HeaderContainer>
  )
}

export default Header