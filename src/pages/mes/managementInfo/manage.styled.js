import React, { useState } from 'react';
import styled from 'styled-components';
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
export const ContentsHeaderWrap = styled("div")`
  display: flex;
  justify-content: end;
  align-items: center;
`;
export const TopWrap = styled.div`
  width: 100%;
  height: 100%;
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
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const InputS = styled(InputSearch)`
  height: 40px;
  
`;
export const ShadowBoxGrid = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: ${(props) =>
    props.isAllScreen
      ? `calc(100vh - ${APP_BAR_HEIGHT} - 50px)`
      : `calc(100vh - ${APP_BAR_HEIGHT} - ${SEARCH_BAR_HEIGHT} - 50px)`};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ChartDiv = styled.div`
  width: 50%;
`;
export const ChartWrap = styled("div")`
  margin: 10px;
  height: 80%;
  background-color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid ${(props) => props.borderColor || "#DEDEDE"};
`;
export const ChartWrap2 = styled("div")`
  margin: 10px;
  height: 80%;
  background-color: #FFFFFF;
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100% - 0px);
  padding: 10px;
  border-radius: 10px;
  background-color: #FFFFFF;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridWrap2 = styled("div")`
  height:80%;
  padding: 10px 10px 10px 10px;
`;
export const GridWrap3 = styled("div")`
  height:30%;
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
  background-color: #FFFFFF;
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
  font-family: 'Noto Sans KR';
  font-weight: 900;
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
  margin-top: 30px;
  margin-left: 25px;
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
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`
export const Left = styled("div")`
  width: calc(50% - 10px);
  height:100%;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px;
`
export const Right = styled("div")`
  width: 50%;
  height:100%;
  background-color: #ffffff;
  margin-left:10px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`
export const LeftTop = styled("div")`
  height: calc(90% - 10px);
  display: 'flex'; 
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-left:10px;
  margin-Right:10px;
  padding: 3px 5px 10px 0px;
  margin-top: 10px;
  margin-bottom:20px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`
export const RightTop = styled("div")`
  height: calc(90% - 10px);
  display: 'flex'; 
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-left:10px;
  padding: 3px 5px 10px 0px;
  margin-top: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`
export const LineCapaTop = styled.div`
  display: 'flex'; 
  height: 60%;
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  padding: 10px 10px 10px 0px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const LineCapaBottom = styled.div`
  display: 'flex'; 
  height: 40%;
  flexDirection: 'column';  
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 10px;
  margin-bottom: 20px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const PartCapaTop = styled.div`
  display: 'flex'; 
  height: 60%;
  border-radius: 10px;
  background-color: #FFFFFF;
  
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const PartCapaBottom = styled.div`
  display: 'flex'; 
  height: 30%;
  border-radius: 10px;
  background-color: #FFFFFF;    
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
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
export const HumidFlexTop = styled.div`
  display: flex;
  border-radius: 10px;
  height: 50%;
  width: 100%;
  background-color: #EFEFEF;
  
`;
export const HumidFlexLast = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  height: 50%;
  margin-top: 10px;
  
`
export const Last = styled("div")`
  width: 100%;
  height:100%;
  background-color: #FFFFFF;
`
export const HumidLeft = styled("div")`
  width: 50%;
  height:100%;
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-right: 5px;
  box-shadow: 0px 2px 10px 0px #00000026;
`
export const HumidRight = styled("div")`
  width: 50%;
  height:100%;
  background-color: #FFFFFF;
  margin-left: 5px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px 0px #00000026;
`

export const InputBox = styled("div")`
  display: flex;
`;

export const InputSet = styled(TextField)`
  width: 180px;
  margin-left: 10px;
  margin-top: 5px;
`;

export const InputText = styled(TextField)`
  height: 40px;
  width: 180px;
  margin-left: 10px;
  margin-top: 5px;
`;
export const AllWrap = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #eeeeee
`;
export const GridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: 100%;
  margin-right: 10px;
  grid-template-columns: 33% 33% 33%;
  background-color: #EFEFEF;
  border-radius: 10px;
  gap: 10px;
`;
export const TempHumidTitle = styled("div")`
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  margin-top: 15px;
  margin-left: 20px;
`;
export const EquipStatusChartWrap = styled("div")`
  margin: 10px;
  height: 60%;
  background-color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid ${(props) => props.borderColor || "#DEDEDE"};
`;