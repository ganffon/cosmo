import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";

const HeaderBox = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  display: flex;
  justify-content: space-between;
  background-color: ${APP_BAR_COLOR};
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
const ButtonBox = styled("div")`
  display: flex;
  justify-content: flex-end;
  grid-column: 1 / -1;
  grid-row: 2 / 2;
  height: 40px;
  padding-right: 15px;
`;
const GridBox = styled("div")`
  width: 100%;
  height: 100%;
  grid-column: 1 / -1;
  grid-row: 3 / -1;
`;

const TitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
`;

const ButtonSet = styled(Button)``;

const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;

export { HeaderBox, GridBox, TitleBox, ButtonBox, ButtonSet, ButtonClose };
