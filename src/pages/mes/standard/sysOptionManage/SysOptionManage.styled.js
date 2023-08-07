import styled from "styled-components";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import * as C from "constant/Layout";
import TextField from "@mui/material/TextField";

export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100% - 50px);
  position: relative;
  margin-top: 10px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 10px;
  height: 40px;
`;
export const ContentWrap = styled("div")`
  height: calc(100% - 60px);
  background: #ffffff;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ButtonTop = styled("div")`
  width: 100%;
  height: 60px;
  display: flex;
  padding-right: 10px;
  align-items: center;
  justify-content: end;
`;
export const SearchCondition = styled("div")`
  height: 60px;
  width: 100%;
  border-radius: 10px;
  background: #ffffff;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;

  padding: 5px 5px 5px 5px;
  display: flex;
  gap: 10px;
`;
