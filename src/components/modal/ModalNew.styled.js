import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";

export const HeaderBox = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const ButtonBox = styled("div")`
  display: flex;
  justify-content: space-between;
  grid-column: 1 / -1;
  grid-row: 2 / 2;
  height: 40px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;
export const TitleWrap = styled("div")`
  display: flex;
  align-items: center;
  margin-left: 15px;
  font-family: NotoSansKR_B;
`;
export const GridBox = styled("div")`
  width: 100%;
  height: 100%;
  grid-column: 1 / -1;
  grid-row: 3 / -1;
  padding: 0px 10px 10px 10px;
`;

export const TitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
  font-family: NotoSansKR_B;
`;

export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;
