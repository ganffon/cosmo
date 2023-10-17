import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";

export const HeaderBox = styled("div")`
  display: flex;
  justify-content: space-between;
  border: solid 1px #e0e0e0;
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const ButtonBox = styled("div")`
  display: flex;
  justify-content: space-between;
  height: 50px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const TitleWrap = styled("div")`
  display: flex;
  align-items: center;
  font-family: NotoSansKR_B;
`;
export const GridBox = styled("div")`
  width: 100%;
  height: calc(100% - 50px);
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

export const Main = styled("div")`
  width: 100%;
  height: calc(100% - 40px);
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MakeOrder = styled("div")`
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 15px;
  height: 200px;
`;

export const OrderTheoryProduction = styled("div")`
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 15px;
  height: calc(100% - 200px);
`;

export const AutoCalArea = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const AutoCalWrap = styled("div")`
  display: flex;
  gap: 20px;
`;
export const InputWrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const InputTitle = styled("div")``;

export const GroupWrapFlex = styled("div")`
  width: 100%;
  display: flex;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 15px;
  gap: 20px;
`;

export const GroupWrap = styled("div")`
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 15px;
`;
