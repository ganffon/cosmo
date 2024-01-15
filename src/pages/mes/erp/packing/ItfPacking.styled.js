import { Autocomplete } from "@mui/material";
import { palette } from "constant/color";
import styled from "styled-components";

export const ShadowBoxButton = styled("div")`
  width: 100%;
  height: 60px;

  background-color: ${palette.white};
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
  algin-items: center;
`;

export const ComboBox = styled(Autocomplete)`
  width: 180px;
  margin-left: 10px;
  margin-top: 5px;
`;

export const ButtonWrap = styled("div")`
  display: flex;
  algin-items: center;
  margin-right: 15px;
`;

export const GridTitleWrap = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
`;

export const GridTitle = styled("div")``;

export const GridButtonWrap = styled("div")`
  display: flex;
  justify-content: flex-end;
  algin-items: center;
  gap: 10px;
`;

export const ShadowBoxGrid = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100% - 40px);
  position: relative;
`;

export const SelectDateErpFilter = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0px 10px;
`;

export const SelectDateErpGridWrap = styled("div")`
  height: calc(100% - 60px);
  width: 100%;
`;

export const SelectErpGridWrap = styled("div")`
  height: 100%;
  width: 100%;
`;
