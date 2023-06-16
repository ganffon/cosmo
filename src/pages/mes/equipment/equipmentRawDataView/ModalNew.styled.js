import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  APP_BAR_HEIGHT,
  SEARCH_BAR_HEIGHT,
  HEIGHT_MARGIN,
} from "constant/Layout";

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
  align-items: center;
`;
export const TitleWrap = styled("div")`
  display: flex;
  align-items: center;
  font-family: NotoSansKR_B;
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
  // grid-column: 1 / -1;
  // grid-row: 2 / 2;
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
  width: 250px;
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
