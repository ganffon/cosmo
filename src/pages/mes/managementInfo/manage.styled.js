import React, { useState } from 'react';
import styled from 'styled-components';
import * as C from "constant/Layout";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import { Resizable } from 'react-resizable';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

export const SplitPanel = () => {
  const [leftWidth, setLeftWidth] = useState(200); // 왼쪽 패널의 초기 너비

  const onResize = (event, { size }) => {
    setLeftWidth(size.width); // 왼쪽 패널의 너비 업데이트
  };

  return (
    <div className="split-panel">
      <Resizable
        className="left-panel"
        width={leftWidth}
        height={window.innerHeight}
        onResize={onResize}
        minConstraints={[100, window.innerHeight]}
        maxConstraints={[500, window.innerHeight]}
      >
        Left Panel
      </Resizable>
      <div className="right-panel" style={{ flex: `1 1 calc(100% - ${leftWidth}px)` }}>
        Right Panel
      </div>
    </div>
  );
};

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
  
  height: 50%;
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
  padding: 10px 10px 10px 10px;
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