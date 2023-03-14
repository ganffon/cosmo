import styled from "styled-components";
import { MENU_FOLD_WIDTH } from "constant/Layout";

const LayoutBox = styled("main")`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const MainBox = styled("section")`
  display: flex;
  height: 100%;
`;

const ContentsBox = styled("section")`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${(props) =>
    props.isMenuSlide ? `calc(100vw - ${MENU_FOLD_WIDTH})` : "100vw"};
`;

export { LayoutBox, MainBox, ContentsBox };
