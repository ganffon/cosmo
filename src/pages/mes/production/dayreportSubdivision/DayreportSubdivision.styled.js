import styled from "styled-components";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  width: 100%;
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`};
  overflow: hidden auto;
  background-color: rgb(255, 255, 255);
  padding: 0px 10px 0px 10px;
`;

export const ContentsLeft = styled("div")``;
export const ContentsRight = styled("div")``;
