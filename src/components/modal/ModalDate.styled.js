import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DatePicker from "components/datetime/DatePicker";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";

export const HeaderBox = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  display: flex;
  justify-content: space-between;
  background-color: ${APP_BAR_COLOR};
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const ToolWrap = styled("div")`
  grid-column: 1 / -1;
  grid-row: 2 / 2;
  display: flex;
  justify-content: space-between;
`;
export const DateBox = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ButtonBox = styled("div")`
  display: flex;
  height: 60px;
  padding-right: 15px;
`;
export const Date = styled(DatePicker)``;
export const GridBox = styled("div")`
  width: 100%;
  height: 100%;
  grid-column: 1 / -1;
  grid-row: 3 / -1;
`;

export const TitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
`;

export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;
