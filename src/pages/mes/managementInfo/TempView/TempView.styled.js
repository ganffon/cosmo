import React, { useState } from 'react';
import styled from 'styled-components';
import { APP_BAR_HEIGHT, SEARCH_BAR_HEIGHT, HEIGHT_MARGIN } from "constant/Layout";

export const ChartModule = styled.div`
    width: 20%;
    display: flex;
    border: 2px solid #ccc;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 10%;
    margin: 5px;
    
`
export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: flex-start; 
`  
  
export const TextContainer = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    justify-content: right;
    text-align: right;
`
  
export const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 5px;
    justify-content: right;
  text-align: right;
`
  
export const Label = styled.div`
    margin-right: 10px;
    font-weight: bold;
`
  
export const Value = styled.div`
    font-style: italic;
    margin-right: 10px;
    text-align: right;
`

export const CntLocation = styled.div`
    margin-right: 10px;
    margin-top: 10px;
    margin-left: 20px;
    font-size: 60px;
    font-weight: bold;
`

export const CntLabel = styled.div`
    margin-right: 10px;
    margin-left: 20px;
    font-size: 40px;
    font-weight: bold;
    justify-content: right;
    text-align: right;
`
  
export const CntValue = styled.div`
  display: flex;
  width: 300px;
  font-size: 20px;
  margin-top: auto; 
  margin-left: auto; 
  margin-right: 10px; 
  text-align: right;
  justify-content: flex-end; /* Aligns the content to the right */
  justify-content: right;
  text-align: right;
`;

export const CntModule = styled.div`
    display: flex;
    border: 1px Solid ${props => props.borderColor};;
    flex-direction: column;
    margin: 10px;
    padding: 5px;
    align-items: flex-start;
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
    width: 100%;
    margin-top: 30px;
    margin-bottom: 5px;
    justify-content: right;
    text-align: right;
`

export const CntTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`
export const GridContainer = styled("div")`
  display: grid;
  width: ${(props) =>
    props.isAllScreen
    ? `calc(100%);`
    : `calc(100%)`};
  height: 100%;
  grid-template-rows: 5% 35% 29% 29% 2%;
  gap: 10px;
`;
export const AllWrap = styled('div')`
  height: 100%;
  width: 100%;  
  border-radius: 10px;
  background-color: #EEEEEE;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const HeaderWrap = styled('div')`
    background-color: #ffffff;
    width: ${(props) =>
        props.isAllScreen
        ? `calc(100%- 50px);`
        : `calc(100%)`};
    height: 90px;
    padding: 0px 10px;
    border-radius: 10px;
    box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const Title = styled("div")`
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 30px;
  line-height: 29px;
  margin-top: 15px;
  margin-left: 25px;
  justify-content: center;
  text-align: center;
`;
export const TimeStamp = styled("div")`
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  margin-top: 15px;
  margin-left: 25px;
  justify-content: right;
  text-align: right;
`;
export const SecondWrap = styled('div')`
    display:flex;
    background-color: #ffffff;
    width: 100%;
    height: ${(props) => props.height};
    border-radius: 10px;
    box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
    margin-top:50px;
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
height: 90%;
  margin: 10px;
  background-color: #FFFFFF;
  
`;