import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";
import InputSearch from "components/input/InputSearch";

export const ModalWrap = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const HeaderBox = styled("div")`
  display: flex;
  justify-content: space-between;
  height: 40px;
`;

export const TitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
`;

export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;
export const Content = styled("div")`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;
