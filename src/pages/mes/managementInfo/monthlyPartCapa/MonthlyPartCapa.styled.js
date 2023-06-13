import React, { useState } from 'react';
import styled from 'styled-components';

export const ChartModule = styled.div`
    display: flex;
    border: 2px solid #ccc;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 10%;
    margin: 5px;
    
`
export const Container = styled.div`
    display: flex;
    align-items: flex-start; 
`  
  
export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    
`
  
export const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 5px;
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
`;

export const CntModule = styled.div`
    display: flex;
    border: 5px Solid #ccc;
    flex-direction: column;
    margin-left: 30px;
    align-items: flex-start;
    width: 30%;
    height: 25%;
    background-color: ${props => props.backColor};
`
export const CntContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
`  
export const CntTextWrapper = styled.div`
    display: flex;
    width: 100%;
`

export const CntTextContainer = styled.div`
    display: flex;
    height: 90%;
`
export const Left = styled("div")`
  flex: 8; 
  background-color: #FFFFFF;
`
export const Right = styled("div")`
  flex: 2; 
  borderRight: '1px solid #ccc'
`