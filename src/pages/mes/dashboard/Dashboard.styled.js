import React, { useState } from 'react';
import styled from 'styled-components';
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
  height: 100%;
  padding: 10px 10px 10px 20px;
`;
export const OtherContent = styled.div`
  width: 50%;
`;

export const Bottom = styled.div`
  height:100%;
  padding: 10px 10px 10px 10px;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
export const ContentsArea = styled("div")`
  width: 100%;
  height:100vh;
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
  height: 40px
`;
export const SearchWrap = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const LeftTop = styled("div")`
  display: 'flex'; 
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-left:10px;
  margin-Right:10px;
  padding: 3px 5px 10px 0px;
  margin-top: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`
export const RightTop = styled("div")`
  display: 'flex'; 
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-left:10px;
  padding: 3px 5px 10px 0px;
  margin-top: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`
export const LeftBottom = styled("div")`
  height: 60%;
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-left: 10px;
  margin-Right:10px;
  margin-top: 20px;
  padding: 0px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  
  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #E9E9E9; /* 스크롤바 색상 */
    border-radius: 4px; /* 스크롤바 모서리 반경 */
  }

  ::-webkit-scrollbar-track {
    background-color: #FFFFFF; /* 스크롤바 트랙 색상 */
    border-radius: 4px; /* 스크롤바 트랙 모서리 반경 */
  }
`;

export const GridContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
export const RightBottom = styled("div")`
  height:55%;
  display: 'flex'; 
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 20px;
  margin-left:10px;
  padding: 3px 5px 10px 0px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`
export const Left = styled("div")`
  width: 30%;
  height:100%;
  background-color: #EFEFEF;
`
export const Right = styled("div")`
  width: 70%;
  height:100%;
  background-color: #EFEFEF;
  margin-Right:10px;
`

export const LineState = styled("div")`
  font-family: Noto Sans KR;
  font-size: 26px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 10px;
`

export const LineStateHeader = styled("div")`
  font-family: Noto Sans KR;
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 20px;
`

export const LineStateBorder = styled("div")`
  box-sizing: border-box;
  width: 140px;
  height: 212px;
  left: 134px;
  top: 142px;
  flex-direction: column;
  background: ${(props) => props.backgroundColor || "#F4FFF8"};
  border: 1px solid ${(props) => props.borderColor || "#9AEBB7"};
  border-radius: 10px;
  margin-top: 5px;
  margin-left: 15px;
`;

export const WorkerBorder = styled("div")`
  height: 180px;
  width: 220px;
  left: 0px;
  top: 0px;
  border-radius: 10px;
  padding: 32px 68px 32px 68px;
  background: ${(props) => props.backgroundColor || "#F4FFF8"};
  border: 1px solid ${(props) => props.borderColor || "#9AEBB7"};
`;

export const Title = styled("div")`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  margin-top: 15px;
  margin-left: 25px;
`;
export const RightTopTitle = styled("div")`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  margin-top: 20px;
  margin-left: 25px;
`;
export const BottomTitle = styled("div")`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  margin-top: 15px;
  margin-bottom: 15px;
`;
