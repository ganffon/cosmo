import React, { useState } from 'react';
import styled from 'styled-components';

export const ChartModule = styled.div`
    display: flex;
    border: 1px dotted #ccc;
    flex-direction: column;
    align-items: flex-start;
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
  