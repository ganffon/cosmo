import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { APP_BAR_HEIGHT, SEARCH_BAR_HEIGHT, HEIGHT_MARGIN } from "constant/Layout";

export const HeaderBox = styled("div")`
  //   grid-column: 1 / -1;
  //   grid-row: 1 / 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const ButtonBox = styled("div")`
  width: 100%;
  justify-content: space-between;
  height: 40px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
  height: 40px;
`;
export const LogoWrap = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid #000;
  height: 100%;
  width: 100%;
`;
export const BtnComponent = styled("button")`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 6px;
  padding: 5px 20px 5px 20px;
  background: #ffffff;
  border: 1px solid rgba(20, 145, 206, 1);
  gap: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(20, 145, 206, 0.9);
  }
  &.clicked {
    animation: clickEffect 0.3s;

    @keyframes clickEffect {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.97);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;
export const SearchTitle = styled("div")`
  font-family: NotoSansKR;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: #1491ce;
`;
export const prodnmTitle = styled("div")`
  font-family: Times New Roman;
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: ${(props) => props.fWeight || "normal"};
  font-size: ${(props) => props.fSize || "22px"};
  align-items: ${(props) => props.alignItem || "center"};
  justify-content: ${(props) => props.alignJustify || "center"};
  border: 1px solid #000;
`;
export const prodnmItem = styled("div")`
  font-family: Times New Roman;
  display: flex;
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.fSize || "44px"};
  align-items: ${(props) => props.alignItem || "center"};
  justify-content: ${(props) => props.alignJustify || "center"};
  font-weight: bold;
  border: 1px solid #000;
`;
export const lotItem = styled("div")`
  font-family: Times New Roman;
  display: flex;
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.fSize || "44px"};
  align-items: ${(props) => props.alignItem || "center"};
  justify-content: ${(props) => props.alignJustify || "center"};
  font-weight: bold;
  border: 1px solid #000;
  letter-spacing: 1mm;
  border-right: 0px;
`;
export const lotIndexItem = styled("div")`
  font-family: Times New Roman;
  display: flex;
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.fSize || "44px"};
  align-items: ${(props) => props.alignItem || "center"};
  justify-content: ${(props) => props.alignJustify || "center"};
  font-weight: bold;
  border: 1px solid #000;
  border-left: 0px;
`;
export const LoginInput = styled(TextField)`
  margin-top: 20px;
  width: 100%;
`;
export const TitleWrap = styled("div")`
  display: flex;
  align-items: center;
  font-family: NotoSansKR_B;
`;
export const ColGridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: ${(props) => props.Template || "50% 50%"};
  background-color: ${(props) => props.Bcolor};
  gap: ${(props) => props.Template || "5px"};
`;
export const RowsGridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: calc(100% - 40px);
  grid-template-rows: ${(props) => props.Template || "50% 50%"};
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
export const ShadowBoxGrid = styled("div")`
  padding: 20px;
  background-color: #ffffff;
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridContainer = styled("div")`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px;
  padding: 10px;
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const GridBox = styled("div")`
  width: 100%;
  height: calc(100% - 30px);
`;
export const Left = styled("div")`
  width: 100%;
  height: 100%;
`;
export const Right = styled("div")`
  width: 1600px;
  height: 500;
`;
export const ChartWrap = styled("div")`
  height: 100%;
  width: calc(100% - 250px);
  background-color: #ffffff;
  border: 1px solid ${(props) => props.borderColor || "#DEDEDE"};
`;
