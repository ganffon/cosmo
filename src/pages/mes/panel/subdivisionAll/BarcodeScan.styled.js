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
  gap: 10px;
  justify-content: start;
  align-items: center;
  padding-top: 10px;
  padding-right: 10px;
`;

export const BarcodeWrap = styled("div")`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(255 255 255 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: white;
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
export const ImgWrap = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(255 255 255 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px;
  background: white;
`;
export const Img = styled("img")`
  height: 420px;
  width: 410px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(255 255 255 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
