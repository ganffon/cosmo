import styled from "styled-components";
import * as C from "constant/Layout";

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
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  height: ${(props) => (props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`)};
  width: ${(props) => (props.isMenuSlide ? `calc(100vw - ${C.MENU_FOLD_WIDTH})` : "100vw")};
`;

export { LayoutBox, MainBox, ContentsBox };
