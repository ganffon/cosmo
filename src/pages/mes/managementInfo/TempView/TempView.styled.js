import React, { useState } from 'react';
import styled from 'styled-components';
import { APP_BAR_HEIGHT, SEARCH_BAR_HEIGHT, HEIGHT_MARGIN } from "constant/Layout";

export const ChartModule = styled.div`
    width: 20%;
    display: flex;
    border: 1px solid #E9E9E9;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 10%;
    background-color:#FAFAFA;
    margin: 10px;
    
`
export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: flex-start; 
`  
  
export const TextContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    justify-content: right;
    text-align: right;
`
  
export const TextWrapper = styled.div`
    display: flex;
    justify-content: ${props => props.justify || 'flex-end'};;
    align-items: ${props => props.align || 'flex-start'};
`
  
export const Label = styled.div`
    font-weight: bold;
    white-space: nowrap;
    color: ${props => props.fontColor};
`
  
export const Value = styled.div`
    font-style: italic;
    margin-right: 10px;
    text-align: right;
`

export const CntLocation = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
    font-weight: bold;
    color: ${props => props.fontColor};
`

export const ImgWrap = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    margin-left: -20px;
    justify-content: center;
    align-items: center;
    font-size: 60px;
    font-weight: bold;
`

export const CntLabel = styled.div`
    display: flex;
    font-size: 40px;
    font-weight: bold;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;
`
  
export const CntValue = styled.div`
  display: flex;
  width: 100%;
  font-size: 20px;
  justify-content: flex-end;
  align-items: flex-start;
  text-align: right;
`;

export const CntModule = styled.div`
    display: flex;
    border: 1px Solid ${props => props.borderColor};;
    flex-direction: column;
    margin: 10px;
    padding: 5px;
    align-items: flex-start;
    border-radius: 10px;
    width: 33%;
    height: calc(100%-10px);
    background-color: ${props => props.backColor};
`
export const CntContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
    justify-content: right;
    text-align: right;
`  
export const CntTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    width: 100%;
    height: 100%;
    margin-bottom: 5px;
`

export const CntTextContainer = styled.div`
    flex-direction: column;
`
export const GridContainer = styled("div")`
  display: grid;
  width: ${(props) =>
    props.isAllScreen
    ? `calc(100%);`
    : `calc(100%)`};
  height: 100%;
  grid-template-rows: 5% 26% 32% 35% 2%;
  gap: 10px;
`;
export const AllWrap = styled('div')`
  height: 100%;
  width: 100%;  
  border-radius: 10px;
  background-color: #EEEEEE
`;
export const HeaderWrap = styled('div')`
    background-color: #EFEFEF;
    width: ${(props) =>
        props.isAllScreen
        ? `calc(100%- 50px);`
        : `calc(100%)`};
    height: 90px;
    padding: 0px 10px;
    border-radius: 10px;
`;
export const Title = styled("div")`
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 30px;
  line-height: 29px;
  
  text-align: left;
`;
export const EachTitle = styled("div")`
  font-family: 'Noto Sans KR';
  background-color: #FFFFFF;
  font-weight: 700;
  font-size: 23px;
  line-height: 29px;
  margin-top: 15px;
  margin-left: 10px;
  justify-content: left;
  text-align: left;
`;
export const ChartTitle = styled("div")`
display: flex;
font-family: Noto Sans KR;
font-size: 20px;
font-weight: 400;
line-height: 29px;
letter-spacing: 0em;
justify-content: left;
  text-align: right;
margin: 15px;
`

export const TimeStamp = styled("div")`
  display:flex;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 25px;
  justify-content: flex-end;
  align-items:flex-start;
  text-align: right;
`;
export const SecondWrap = styled('div')`
    background-color: #FFFFFF;
    width: 100%;
    height: ${(props) => props.height};
    border-radius: 10px;
    box-shadow: 0px 2px 10px 0px #00000026;
`;
export const SecondGridWrap = styled('div')`
    display:flex;
    background-color: #ffffff;
    width: 100%;
    height: 80%;
    border-radius: 10px;
`;
export const ShadowBoxButton2 = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: ${SEARCH_BAR_HEIGHT};
  padding: 0px 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px 0px #00000026;
`;
export const ThirdWrap = styled('div')`
    display:flex;
    background-color: #ffffff;
    width: 100%;
    height: ${(props) => props.height};
    border-radius: 10px;
    box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const LastWrap = styled('div')`
    display:flex;
    background-color: #ffffff;
    width: 100%;
    height: ${(props) => props.height};
    border-radius: 10px;
    box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ChartWrap = styled("div")`
    width: 100%;
    height: 100%;
`;
export const StatusGridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: 100%;
  
  grid-template-columns: 20% 20% 60%;
  border-radius: 10px;
  gap: 10px;
`;
export const CntGridContainer = styled("div")`
  display: grid;
  width: calc(100% - 30px);
  height: 100%;
  grid-template-rows: ${props => props.rowTemplate || "50% 50%"};
  border-radius: 10px;
`;
export const TwoColGridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: ${props => props.rowTemplate || "50% 50%"};
  border-radius: 10px;
`;
export const TwoRowsGridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: ${props => props.rowTemplate || "50% 50%"};
  border-radius: 10px;
`;