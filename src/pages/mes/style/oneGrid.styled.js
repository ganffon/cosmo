import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "components/datetime/DatePicker";
import { APP_BAR_HEIGHT, SEARCH_BAR_HEIGHT, HEIGHT_MARGIN } from "constant/Layout";

export const ShadowBoxButton = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: 60px;
  padding: 0px 10px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ToolWrap = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px;
`;
export const SearchWrap = styled("div")`
  display: flex;
`;
export const InputWrap = styled("div")`
  display: flex;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 10px;
  height: 40px;
`;
export const ShadowBoxGrid = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100% - 40px);
  position: relative;
`;
export const GridWrapReport = styled("div")`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ComboWrap = styled("div")`
  display: flex;
  margin-left: 10px;
  margin-top: 5px;
  gap: 10px;
`;
export const ComboBox = styled(Autocomplete)`
  width: 180px;
`;

export const Date = styled(DatePicker)`
  height: 40px;
`;
