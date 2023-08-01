import styled, { keyframes } from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import * as C from "constant/Layout";

export const BarcodeArea = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 10px;
`;
export const ContentsEmp = styled("header")`
  width: 100%;
  height: 50px;
  background: red;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 0px 20px;
`;
export const ContentsMain = styled("div")`
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  gap: 10px;
`;

export const EmpTitle = styled("div")``;
export const ContentsLeft = styled("div")`
  width: 1200px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  position: relative;
`;
export const ObjectSection = styled("div")`
  width: 100%;
  height: 50%;
  display: flex;
  &.objectBottom {
    justify-content: center;
  }
`;
export const ObjectWrap = styled("div")`
  width: 50%;
  height: 100%;
  background: aqua;
  display: flex;
  flex-direction: column;
`;
export const ButtonWrap = styled("div")`
  width: 100%;
  height: 40px;
`;
export const SackWrap = styled("div")`
  width: 100%;
  height: calc(100% - 40px);
  background: yellow;
`;
export const Sack = styled("div")`
  width: 100%;
  height: 50%;
  background: green;
`;
export const ContentsRight = styled("div")`
  width: calc(100% - 1200px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
// export const ScreenTitleBox = styled("div")`
//   height: auto;
//   width: 100%;
//   border-radius: 10px;
//   border-color: rgb(200, 200, 200);
//   box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
//   padding: 10px 10px 10px 30px;
//   font-family: NotoSansKR_B;
//   font-size: 20px;
// `;
