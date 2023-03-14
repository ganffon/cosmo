import styled from "styled-components";
import { APP_BAR_HEIGHT } from "constant/Layout";

const ContentsArea = styled("div")`
  width: 100%;
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${APP_BAR_HEIGHT})`};
  overflow: hidden auto;
  background-color: white;
  padding: 0px 10px 0px 10px;
`;
const ShadowBoxFixed = styled("div")`
  background-color: rgb(255, 255, 255);
  width: ${(props) =>
    props.isMenuSlide ? `calc(100% - 7.5rem)` : `calc(100% - 2rem)`};
  height: auto;
  position: fixed;
  top: ${(props) => (props.isAllScreen ? 0 : 100)};
  left: 1;
  z-index: 100;
  border-radius: 3px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
const paddingBox = styled("div")`
  padding-top: 50px;
`;
const ShadowBox = styled("div")`
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: auto;
  border-radius: 3px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
const InputWrap = styled("div")`
  display: flex;
  flex-flow: row wrap;
  gap: 0px 10px;
  padding: 5px 5px 5px 10px;
`;
const ButtonWrap = styled("div")`
  display: flex;
  justify-content: flex-end;
  padding: 5px 5px 5px 0px;
`;
const GridTopWrap = styled("div")`
  width: 100%;
  height: 300px;
`;
const GridBottomWrap = styled("div")`
  width: 100%;
  height: 700px;
`;
export {
  ContentsArea,
  ShadowBoxFixed,
  paddingBox,
  ShadowBox,
  InputWrap,
  ButtonWrap,
  GridTopWrap,
  GridBottomWrap,
};
