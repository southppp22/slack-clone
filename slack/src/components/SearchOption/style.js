import styled from "styled-components";

export const searchOptionContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 20px;

  :hover {
    background-color: #0f64ad;
    > h4 {
      color: white;
    }
  }

  > img {
    height: 27.5px;
    border-radius: 8px;
  }

  > h4 {
    font-size: 18px;
    margin-left: 20px;
    color: black;
  }
`;
