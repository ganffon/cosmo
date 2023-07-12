import React, { useState } from "react";
import styled from "styled-components";
import * as C from "constant/Layout";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import TextField from "@mui/material/TextField";
import { APP_BAR_HEIGHT, SEARCH_BAR_HEIGHT, HEIGHT_MARGIN } from "constant/Layout";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;
export const ContentsHeader = styled("div")`
  height: 55px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
`;
export const Date = styled(DatePicker)`
  height: 45px;
`;
export const SearchWrap = styled("div")`
  display: flex;
`;
export const SearchColumnWrap = styled("div")`
  display: flex;
  flex-direction: column;
`;
export const ContentsHeaderWrap = styled("div")`
  display: flex;
  justify-content: end;
  align-items: center;
`;
export const TopWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #efefef;
`;
export const Top = styled.div`
  display: "flex";
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: 20px;
  margin-left: 10px;
  padding: 3px 5px 10px 0px;
  margin-bottom: 20px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const InputS = styled(InputSearch)`
  height: 40px;
`;
export const ShadowBoxGrid = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: ${(props) =>
    props.isAllScreen ? `calc(100vh - ${APP_BAR_HEIGHT} - 50px)` : `calc(100vh - ${APP_BAR_HEIGHT} - ${SEARCH_BAR_HEIGHT} - 50px)`};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 10px;
  height: 40px;
`;
export const ShadowBoxButton = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: ${SEARCH_BAR_HEIGHT};
  padding: 0px 10px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ShadowHeaderBoxButton = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: ${SEARCH_BAR_HEIGHT} * 2;
  padding: 0px 10px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ShadowBoxButton2 = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: ${SEARCH_BAR_HEIGHT};
  padding: 0px 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px 0px #00000026;
`;
export const ToolWrap = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px;
`;
export const FlexTop = styled.div`
  display: flex;
  height: 60%;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px 10px 10px 0px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const FlexBottom = styled.div`
  display: flex;
  height: 50%;
  padding: 10px 10px 10px 10px;
`;
export const SearchCondition = styled("div")`
  height: 60px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  padding: 5px 5px 5px 5px;
  display: flex;
`;
export const Title = styled("div")`
  font-family: "Noto Sans KR";
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;
  margin-top: 15px;
  margin-left: 25px;
`;
export const GridData = styled("div")`
  font-family: "Noto Sans KR";
  font-weight: 900;
  font-size: 30px;
  line-height: 29px;
  background-color: ${(props) => props.Bcolor};
  color: ${(props) => props.color};
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
`;
export const BottomTitle = styled("div")`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  margin-top: 30px;
  margin-left: 25px;
`;
export const RightBottom = styled("div")`
  height: 55%;
  display: "flex";
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: 20px;
  margin-left: 10px;
  padding: 3px 5px 10px 0px;
  margin-bottom: 20px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const Left = styled("div")`
  width: calc(15% - 10px);
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px;

  flexdirection: "column";
  justify-content: center;

  overflow: auto;

  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #e9e9e9; /* 스크롤바 색상 */
    border-radius: 4px; /* 스크롤바 모서리 반경 */
  }

  ::-webkit-scrollbar-track {
    background-color: #ffffff; /* 스크롤바 트랙 색상 */
    border-radius: 4px; /* 스크롤바 트랙 모서리 반경 */
  }
`;
export const TimeRateLeft = styled("div")`
  width: 56%;
  height: 100%;
  border-radius: 10px;
`;
export const PerformaceRateLeft = styled("div")`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
export const ColGridContainer = styled("div")`
  display: grid;
  width: 90%;
  height: 60%;
  margin: 30px;
  grid-template-columns: ${(props) => props.Template || "50% 50%"};
  background-color: ${(props) => props.Bcolor || "#ffffff"};
  gap: ${(props) => props.Template || "5px"};
`;
export const ColGridContainer2 = styled("div")`
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-columns: ${(props) => props.Template || "50% 50%"};
  background-color: ${(props) => props.Bcolor || "#ffffff"};
  gap: ${(props) => props.Template || "-3px"};
`;
export const RowsGridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: 100%;

  grid-template-rows: ${(props) => props.Template || "50% 50%"};
  background-color: ${(props) => props.Bcolor};
  gap: ${(props) => props.Template || "5px"};
`;
export const RowsGridContainer2 = styled("div")`
  display: grid;
  width: 50%;
  height: calc(30% - 70px);
  margin: 10px 30px 30px 30px;
  grid-template-rows: ${(props) => props.Template || "50% 50%"};
  background-color: ${(props) => props.Bcolor};
  gap: ${(props) => props.Template || "5px"};
`;
export const Right = styled("div")`
  width: 85%;
  height: 100%;
  background-color: #ffffff;
  margin-left: 10px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const TimeRateRight = styled("div")`
  width: calc(44% - 10px);
  height: 100%;
  margin-left: 10px;
  border-radius: 10px;
`;
export const LeftTop = styled("div")`
  height: calc(90% - 10px);
  display: "flex";
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  margin-left: 10px;
  margin-right: 10px;
  padding: 3px 5px 10px 0px;
  margin-top: 10px;
  margin-bottom: 20px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const RightTop = styled("div")`
  height: calc(90% - 10px);
  display: "flex";
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  margin-left: 10px;
  padding: 3px 5px 10px 0px;
  margin-top: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const LineCapaTop = styled.div`
  display: "flex";
  height: 60%;
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px 10px 10px 0px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const TimeRateTop = styled.div`
  display: "flex";
  width: 100%;
  height: 60%;
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px 10px 10px 0px;
`;
export const LineCapaBottom = styled.div`
  display: "flex";
  height: 40%;
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: 10px;
  margin-bottom: 20px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const TimeRateBottom = styled.div`
  display: "flex";
  height: calc(40% - 10px);
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: 10px;
  margin-bottom: 20px;
`;
export const PartCapaTop = styled.div`
  display: "flex";
  height: 60%;
  border-radius: 10px;
  background-color: #ffffff;

  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const PartCapaBottom = styled.div`
  display: "flex";
  height: 30%;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const PartCapaLeft = styled("div")`
  width: 70%;
  height: 100%;
  background-color: #ffffff;
`;
export const PartCapaRight = styled("div")`
  width: 30%;
  height: 100%;
  background-color: #ffffff;
  margin-right: 10px;
`;
export const HumidFlexTop = styled.div`
  display: flex;
  border-radius: 10px;
  height: 50%;
  width: 100%;
  background-color: #efefef;
`;
export const HumidFlexLast = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  height: 50%;
  margin-top: 10px;
`;
export const Last = styled("div")`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;
export const HumidLeft = styled("div")`
  width: 50%;
  height: 100%;
  border-radius: 10px;
  background-color: #ffffff;
  margin-right: 5px;
  box-shadow: 0px 2px 10px 0px #00000026;
`;
export const HumidRight = styled("div")`
  width: 50%;
  height: 100%;
  background-color: #ffffff;
  margin-left: 5px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px 0px #00000026;
`;

export const InputBox = styled("div")`
  display: flex;
`;

export const InputSet = styled(TextField)`
  width: 100%;
  height: 100%;
  padding: 0px;
  background-color: ${(props) => props.Bcolor};
  input {
    text-align: center;
    color: blue;
    font-family: "Arial", sans-serif; /* 폰트 설정 */
    font-size: 69px; /* 폰트 크기 설정 */
  }
`;

export const InputText = styled(TextField)`
  height: 40px;
  width: 180px;
  margin-left: 10px;
  margin-top: 5px;
`;
export const AllWrap = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  overflow: auto;
  // ::-webkit-scrollbar {
  //   width: 8px; /* 스크롤바 너비 */
  // }

  // ::-webkit-scrollbar-thumb {
  //   background-color: #e9e9e9; /* 스크롤바 색상 */
  //   border-radius: 4px; /* 스크롤바 모서리 반경 */
  // }

  // ::-webkit-scrollbar-track {
  //   background-color: #ffffff; /* 스크롤바 트랙 색상 */
  //   border-radius: 4px; /* 스크롤바 트랙 모서리 반경 */
  // }
`;
export const GridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: 100%;
  margin-right: 10px;
  grid-template-columns: 33% 33% 33%;
  background-color: #efefef;
  border-radius: 10px;
  gap: 10px;
`;
export const GridContainer2 = styled("div")`
  display: grid;
  width: 100%;
  height: calc(100% - 70px);
  margin-right: 10px;
  grid-template-columns: 10% 40% 49%;
  background-color: #ffffff;
  border-radius: 10px;
  gap: 0px 10px;
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
export const BtnComponent = styled("button")`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 6px;
  padding: 10px;
  margin-top: 20px;
  background: ${(props) => (props.clicked ? "rgba(87, 181, 243, 0.05)" : "#ffffff")};
  border: 1px solid rgba(20, 145, 206, 1);
  gap: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(87, 181, 243, 0.05);
  }
  &.clicked {
    animation: clickEffect 0.8s;
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
export const countChartFirst = styled.div`
  display: "flex";
  height: 100%;
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px 10px 10px 0px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const countChartSecond = styled.div`
  display: "flex";
  height: calc(33% - 5px);
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const ContentsArea = styled("div")`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #efefef;
  padding: 20px;

  display: flex;
  ${(props) => (!props.hidden && props.flexColumn ? "flex-direction: column;" : "")}

  gap: 10px;

  & .redText {
    color: red;
  }

  & .selectedBack {
    background-color: #fdf0f6;
  }
`;
