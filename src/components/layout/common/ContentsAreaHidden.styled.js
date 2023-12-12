import styled from "styled-components";

export const ContentsArea = styled("div")`
  width: 100%;
  height: 100vh;
  overflow: hidden auto;
  background-color: #efefef;
  padding: 20px;

  & .redText {
    color: red;
  }

  & .blueText {
    color: blue;
  }

  & .boldText {
    font-weigh: 900;
  }

  & .selectedBack {
    background-color: #fdf0f6;
  }

  & .subtotalBack {
    background-color: #fdf0f6;
  }
`;
