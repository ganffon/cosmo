import React, { useState } from "react";
import styled from "styled-components";
import * as C from "constant/Layout";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;
export const ContentsHeader = styled("div")`
  height: 40px;
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
  height: 40px;
`;
export const ContentsHeaderWrap = styled("div")`
  display: flex;
  justify-content: end;
  align-items: center;
`;
export const Top = styled.div`
  height: 100%;
  padding: 10px 10px 10px 10px;
`;
export const InputS = styled(InputSearch)`
  height: 40px;
`;
export const ShadowBoxGrid = styled("div")`
  background-color: rgb(255, 255, 255);
  width: calc(100% - 0.5rem);
  height: ${(props) =>
    props.isAllScreen
      ? `calc(100vh - ${C.APP_BAR_HEIGHT} - ${C.HEIGHT_MARGIN})`
      : `calc(100vh - ${C.APP_BAR_HEIGHT} - ${C.SEARCH_BAR_HEIGHT} - ${C.HEIGHT_MARGIN})`};
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ChartDiv = styled.div`
  width: 50%;
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: 80%;
  padding: 5px 0px 10px 20px;
  border-radius: 10px;
  background-color: #ffffff;
`;
export const EmpStatusWrap = styled("div")`
  width: 100%;
  height: 65%;
  margin-top: 10px;
  padding: 5px 0px 15px 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const OtherContent = styled.div`
  width: 50%;
`;

export const Bottom = styled.div`
  height: 100%;
  padding: 10px 10px 10px 10px;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
export const ContentsArea = styled("div")`
  width: 100%;
  height: 100vh;
  overflow: hidden auto;
  background-color: white;
`;
export const ShadowBoxButton = styled("div")`
  background-color: rgb(255, 255, 255);
  width: calc(100% - 0.5rem);
  height: ${C.SEARCH_BAR_HEIGHT};
  border-radius: 10px;
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ToolWrap = styled("div")`
  justify-content: space-between;
  align-items: end;
  padding: 5px 5px 15px 5px;
  height: 40px;
`;
export const SearchWrap = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const LeftTop = styled("div")`
  height: 35%;
  display: "flex";
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  padding: 3px 5px 10px 0px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const RightTop = styled("div")`
  height: 40%;
  display: "flex";
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  margin-left: 10px;
  padding: 5px 5px 0px 0px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const LeftBottom = styled("div")`
  height: calc(95% - 20px);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
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

export const GridContainer = styled("div")`
  display: grid;
  height: 100%;
  margin-right: 10px;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
export const GridContainer2 = styled("div")`
  display: grid;
  height: 100%;
  margin-right: 10px;
  grid-template-columns: 50% 50%;
  gap: 10px;
`;
export const RightBottom = styled("div")`
  height: 60%;
  display: "flex";
  flexdirection: "column";
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: 10px;
  margin-left: 10px;
  padding: 3px 5px 0px 0px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const Left = styled("div")`
  width: 30%;
  height: 100%;
  background-color: #efefef;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const Right = styled("div")`
  width: 70%;
  height: 100%;
  background-color: #efefef;
`;

export const LineState = styled("div")`
  font-family: Noto Sans KR;
  height: 40px;
  width: 100%;
  font-size: 23px;
  font-weight: 700;
  color: ${(props) => props.color || "black"};
  line-height: 40px;
  text-align: center;
`;

export const LineStateHeader = styled("div")`
  font-family: Noto Sans KR;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-top: 30px;
`;

export const LineStateBorder = styled("div")`
  box-sizing: border-box;
  width: 30%;
  height: 90%;
  flex-direction: column;
  background: ${(props) => props.backgroundColor || "#F4FFF8"};
  border: 1px solid ${(props) => props.borderColor || "#9AEBB7"};
  border-radius: 10px;
  margin-left: 15px;
`;

export const WorkerBorder = styled("div")`
  height: 150px;
  width: 100%;
  border-radius: 10px;
  margin-right: 5px;
  background: ${(props) => props.backgroundColor || "#F4FFF8"};
  border: 1px solid ${(props) => props.borderColor || "#9AEBB7"};
`;

export const Title = styled("div")`
  height: 40px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  margin-top: 15px;
  margin-left: 25px;
`;
export const RightTopTitle = styled("div")`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  margin-top: 20px;
  margin-left: 25px;
`;
export const BottomTitle = styled("div")`
  height: 40px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  margin-top: 15px;
  margin-bottom: 15px;
`;
export const AllWrap = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #eeeeee;
`;

export const ImgWrap = styled("div")`
  display: flex;
  width: 100%;
  border-radius: 10px;
  height: calc(80%);
  background-color: #ffffff;
`;
export const ChartWrap = styled("div")`
  margin: 15px;
  height: 95%;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.borderColor || "#DEDEDE"};
`;
export const RBGridWrap = styled("div")`
  width: 100%;
  height: 200px;
  padding: 5px 10px 10px 10px;
  border-radius: 10px;
  background-color: #ffffff;
`;
