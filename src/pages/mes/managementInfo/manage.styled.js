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
  height: 50px;
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
export const TopWrap = styled.div`
  width: 100%;
  height: 100%;
  width: calc(100% - 0.5rem);
  margin-top: 20px;
  background-color: #EFEFEF;
`;
export const Top = styled.div`
  display: 'flex'; 
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 20px;
  margin-left:10px;
  padding: 3px 5px 10px 0px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
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
export const ChartWrap = styled("div")`
  padding: 10px 10px 10px 10px;
  margin: 10px;
  background-color: #FFFFFF;
  border: 1px solid ${(props) => props.borderColor || "#DEDEDE"};
`;
export const GridWrap = styled("div")`
  padding: 10px 10px 10px 10px;
`;
export const OtherContent = styled.div`
  width: 50%;
`;

export const Bottom = styled.div`
  height:50%;
  padding: 80px 10px 10px 10px;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
export const ContentsArea = styled("div")`
  width: 100%;
  height:100%;
  background-color: #EFEFEF;
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

export const FlexTop = styled.div`
  display: flex;
  height: 60%;
  padding: 10px 10px 10px 10px;
`;
export const FlexBottom = styled.div`
  display: flex;
  height: 45%;
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
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  margin-top: 15px;
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
  width: 50%;
  height:100%;
  background-color: #EFEFEF;
`
export const Right = styled("div")`
  width: 50%;
  height:100%;
  background-color: #EFEFEF;
  margin-Right:10px;
`
export const LeftTop = styled("div")`
  height:90%;
  display: 'flex'; 
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-left:10px;
  margin-Right:10px;
  padding: 3px 5px 10px 0px;
  margin-top: 10px;
  margin-bottom:20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`
export const RightTop = styled("div")`
  height:90%;
  display: 'flex'; 
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-left:10px;
  padding: 3px 5px 10px 0px;
  margin-top: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`
export const LineCapaTop = styled.div`
  display: 'flex'; 
  height: 60%;
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 20px;
  margin-left:10px;
  padding: 3px 5px 10px 0px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;
export const LineCapaBottom = styled.div`
  display: 'flex'; 
  height: 25%;
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 20px;
  margin-left:10px;
  padding: 3px 5px 10px 0px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

export const PartCapaTop = styled.div`
  display: 'flex'; 
  height: 60%;
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 20px;
  margin-left:10px;
  padding: 3px 5px 10px 0px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;
export const PartCapaBottom = styled.div`
  display: 'flex'; 
  height: 25%;
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 20px;
  margin-left:10px;
  padding: 3px 5px 10px 0px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;
export const PartCapaLeft = styled("div")`
  width: 70%;
  height:100%;
  background-color: #FFFFFF;
`
export const PartCapaRight = styled("div")`
  width: 30%;
  height:100%;
  background-color: #FFFFFF;
  margin-Right:10px;
`