import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  width: 100%;
  height: ${(props) => (props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`)};
  overflow: hidden auto;
  background-color: white;
  padding: 0px 10px 0px 10px;
`;
export const ShadowBoxButton = styled("div")`
  background-color: rgb(255, 255, 255);
  width: calc(100% - 0.5rem);
  height: 60px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);

  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ToolWrap = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 5px 5px 5px 0px;
`;
export const SearchWrap = styled("div")`
  display: flex;
  flex-direction: column;
`;
export const ComboWrap = styled("div")`
  display: flex;
`;
export const ComboBox = styled(Autocomplete)`
  margin-top: 5px;
  margin-left: 10px;
  width: 180px;
`;
export const InputWrap = styled("div")`
  display: flex;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  height: 30px;
`;
export const ShadowBoxGrid = styled("div")`
  background-color: rgb(255, 255, 255);
  width: calc(100% - 0.5rem);
  height: calc(100% - 60px);
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 10px;
`;
