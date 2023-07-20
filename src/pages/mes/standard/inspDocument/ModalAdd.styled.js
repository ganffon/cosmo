import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";

export const HeaderBox = styled("div")`
  display: flex;
  justify-content: space-between;
  background-color: ${APP_BAR_COLOR};
  border-radius: 10px 10px 0px 0px;
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
export const ScrollBox = styled("div")`
  width: 100%;
  height: calc(100% - 40px);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ShadowBoxHeader = styled("section")`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ShadowBoxDetail = styled("section")`
  width: 100%;
  height: calc(100% - 200px);
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const ShadowBoxButtonHeader = styled("div")`
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 0px 20px;
`;
export const Title = styled("div")`
  font-family: NotoSansKR_B;
  font-size: 20px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  gap: 10px;
`;
export const GridHeaderWrap = styled("div")`
  height: calc(100% - 40px);
  padding: 10px;
`;
