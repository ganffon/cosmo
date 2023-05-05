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
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const GridBox = styled("div")`
  width: 100%;
  height: 100%;
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
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
