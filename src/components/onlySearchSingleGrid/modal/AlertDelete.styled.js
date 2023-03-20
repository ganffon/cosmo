import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
const TitleBox = styled(Typography)`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
`;
const ContentsBox = styled("div")`
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Messeage = styled(Typography)`
  margin-bottom: 25px;
  font-size: 20px;
  font-weight: 500;
`;

const ButtonBox = styled("div")``;

const ButtonYes = styled(Button)`
  margin-right: 15px;
`;
const ButtonNo = styled(Button)``;

export {
  HeaderBox,
  TitleBox,
  ContentsBox,
  Messeage,
  ButtonBox,
  ButtonYes,
  ButtonNo,
};
