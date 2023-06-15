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
  padding: 0px 5px 20px 15px;
`;
export const HeaderBox = styled("div")`
  display: flex;
  justify-content: space-between;
  height: 40px;
`;

export const TitleBox = styled("div")`
  padding-top: 8px;
  font-weight: 700;
`;

export const ButtonClose = styled(IconButton)``;
export const Content = styled("div")`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  padding-left: 30px;
`;

export const InputWrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 30px;
`;
export const Title = styled("div")`
  width: 150px;
  display: flex;
  justify-content: end;
  font-family: NotoSansKR;
  font-size: 30px;
`;
