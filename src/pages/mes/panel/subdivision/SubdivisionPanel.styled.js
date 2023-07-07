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
export const ContentsLeft = styled("div")`
  height: 100%;
  width: 530px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const ContentsRight = styled("div")`
  height: 100%;
  width: calc(100% - 540px);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const ScreenTitleBox = styled("div")`
  height: auto;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 30px;
  font-family: NotoSansKR_B;
  font-size: 20px;
`;

export const ScreenTopTitleBox = styled("div")`
  width: 100%;
  padding-left: 10px;
  font-family: NotoSansKR_B;
  font-size: 22px;
`;
export const ItemInfoBox = styled("div")`
  height: 180px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px 20px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 20px;
  background: #ffffff;
`;
export const DataInterfaceBox = styled("div")`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: #ffffff;
  padding: 50px 20px 20px 20px;
`;

export const DataInterfaceWrap = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10%;
`;
export const InputWrap = styled("div")`
  height: 200px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px 15px;
`;
export const MadeButtonWrap = styled("div")`
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const ButtonBox = styled("div")`
  height: 180px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ProcessBox = styled("div")`
  height: 190px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(255 255 255 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 15px;
  background: white;
`;

export const ProcessButton = styled("div")`
  height: 100%;
  width: 200px;
  background: #828282;
  border-radius: 10px;
  color: black;
  font-family: NotoSansKR;
  font-size: 80px;
  padding: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;

  &.green {
    background: #1df06e;
    font-weight: 900;
    cursor: not-allowed;
  }
  &.yellow {
    background: #ffbe0a;
    font-weight: 900;
    cursor: pointer;
  }
`;

const ProgressBar = keyframes`
  0% {
    width: 0%;
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
`;
const ProgressBarReverse = keyframes`
  0% {
    width: 100%;
    opacity: 1;
  }
  99% {
    width: 1%;
    opacity: 1;
  }
  100% {
    width: 0%;
    opacity: 0;
  }
`;
export const ProcessLineBox = styled("div")`
  height: 20px;
  width: 260px;
  background: #828282;
  color: black;
  font-family: NotoSansKR;
  font-size: 80px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  text-decoration: none;
  display: flex;
  align-items: center;
`;
export const ProcessLine = styled("div")`
  height: 20px;
  width: 0%;
  border: solid #1df06e 1px;
  background: #1df06e;
  opacity: 0;
  &.progressBarOn {
    animation: ${ProgressBar} 1s linear forwards;
  }
  &.progressBarOff {
    animation: ${ProgressBarReverse} 1s linear forwards;
  }
`;
export const DataHandleBox = styled("div")`
  height: calc(100% - 190px);
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(255 255 255 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 15px;
  background: white;
  & .tui-grid-cell-header {
    font-size: 20px;
  }
  & .tui-grid-cell-content {
    font-size: 25px;
  }
`;
export const InputSelectBox = styled("div")`
  width: 370px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  padding: 0px 20px 0px 20px;
`;
export const InputBox = styled("div")`
  width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  padding: 0px 20px 0px 20px;
`;
export const InputBoxLeft = styled("div")`
  height: 100%;
  width: 50%;
`;
export const InputBoxRight = styled("div")`
  height: 100%;
  width: 50%;
`;
export const Input = styled(TextField)`
  width: 200px;
`;
export const Title = styled(Typography)`
  width: 100px;
  font-family: NotoSansKR_B;
  font-size: 15px;
`;
export const ScaleLock = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ScaleLockIcon = styled(LockIcon)`
  width: 30%;
  height: 30%;
  color: gray;
`;
