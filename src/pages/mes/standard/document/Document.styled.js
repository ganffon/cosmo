import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { APP_BAR_HEIGHT, FIXED_LEFT } from "constant/Layout";

export const ContentsArea = styled("div")`
  width: 100%;
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${APP_BAR_HEIGHT})`};
  overflow: hidden auto;
  background-color: white;
  padding: 0px 10px 0px 10px;
`;
export const ShadowBoxButton = styled("div")`
  background-color: rgb(255, 255, 255);
  width: ${(props) =>
    props.isMenuSlide ? `calc(100% - 7.5rem)` : `calc(100% - 2rem)`};
  height: auto;
  position: fixed;
  top: ${(props) => (props.isAllScreen ? "0px" : `${APP_BAR_HEIGHT}`)};
  left: ${(props) => (props.isMenuSlide ? `${FIXED_LEFT}` : "10px")};
  z-index: 100;
  border-radius: 3px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ShadowBoxInputInfo = styled("div")`
  background-color: rgb(255, 255, 255);
  width: calc(100% - 0.5rem);
  border-radius: 3px;
  border-color: rgb(255, 255, 255);
  margin-top: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const SearchWrap = styled("div")`
  display: flex;
  flex-flow: row wrap;
  gap: 0px 10px;
  padding: 5px 5px 5px 10px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  justify-content: flex-end;
  padding: 5px 5px 5px 0px;
`;
export const GridHeaderWrap = styled("div")`
  width: calc(100% - 0.5rem);
  height: 40%;
  margin-top: 10px;
`;
export const GridDetailWrap = styled("div")`
  width: calc(100% - 0.5rem);
  height: 80%;
  margin-top: 10px;
`;
export const InputBox = styled("div")`
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
`;
export const Title = styled(Typography)`
  width: 100px;
`;

export const Input = styled(TextField)`
  width: 150px;
`;
export const paddingBox = styled("div")`
  height: 100%;
  padding-top: ${APP_BAR_HEIGHT};
`;
