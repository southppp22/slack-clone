import styled from "styled-components";
import { Avatar } from "@material-ui/core";

export const HeaderSearch = styled.div`
  position: relative;
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 0 50px;
  color: white;
  border: 1px gray solid;

  :hover {
    border: 1px #ccc solid;
    filter: brightness(1.1);
  }

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    outline: 0;
    color: white;
    width: 100%;
  }

  > input::placeholder {
    color: white;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

export const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

export const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

export const HeaderAvater = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

export const HeaderSearchDrobBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: -15px;
  width: 50vw;
  min-height: 80px;
  border: 1px solid gray;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 8px;
`;

export const HeaderSearchDrobBoxTop = styled.div`
  position: relative;
  height: 40px;
  border-bottom: 1px solid gray;

  > .MuiSvgIcon-root {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    color: black;
  }

  > input {
    border: none;
    width: 90%;
    height: 100%;
    outline: 0;
    color: black;
    background-color: transparent;
    padding-left: 30px;
    font-size: 16px;
  }

  > input::placeholder {
    color: gray;
  }

  > input ~ .MuiSvgIcon-root {
    top: 50%;
    right: 1%;
    transform: translate(0, -50%);
    cursor: pointer;
  }
`;

export const HeaderSearchDrobBoxBottom = styled.div`
  > div + div {
    border-top: 1px solid #aaa;
  }
`;
