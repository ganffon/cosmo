import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";

export const HeaderBox = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  display: flex;
  justify-content: space-between;
  background-color: ${APP_BAR_COLOR};
  border: solid 1px #e0e0e0;
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const ButtonBox = styled("div")`
  display: flex;
  justify-content: flex-end;
  grid-column: 1 / -1;
  grid-row: 6 / 6;
  height: 40px;
  padding-right: 15px;
  padding-bottom: 5px;
`;
export const GridTopTitleBox = styled("div")`
  width: 100%;
  height: 100%;
  grid-column: 1 / -1;
  grid-row: 2 / 2;
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
`;
export const GridBoxTop = styled("div")`
  width: 100%;
  height: 100%;
  grid-column: 1 / -1;
  grid-row: 3 / 6;

  padding: 0px 10px 10px 10px;
`;
export const GridBoxBottom = styled("div")`
  width: 100%;
  height: 100%;
  grid-column: 1 / -1;
  grid-row: 7 / -1;
  padding: 0px 10px 10px 10px;
`;

export const TitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
`;

export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;
