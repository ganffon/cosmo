import { palette } from "constant/color";
import styled from "styled-components";

export const ConditionWrap = styled("div")`
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterWrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SwitchWrap = styled("div")`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  border: 1px solid ${palette.black[300]};
  border-radius: 5px;
`;

export const SwitchName = styled("div")`
  display: flex;
  align-items: center;

  &.unitOn {
    color: ${palette.black[900]};
  }

  &.unitOff {
    color: ${palette.black[300]};
  }
`;

export const ChartWrap = styled("div")`
  width: 100%;
  height: calc(100% - 400px);
  display: flex;
  gap: 10px;
`;

export const ChartBox = styled("div")`
  width: 33%;
  height: 100%;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const InventoryWrap = styled("div")`
  width: 100%;
  height: 320px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  display: flex;
`;

export const GridBox = styled("div")`
  width: 50%;
  height: 100%;
`;

export const TitleWrap = styled("div")`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
`;

export const Title = styled("div")`
  font-family: NotoSansKR;
`;

export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100% - 60px);
  padding: 0px 10px;
`;
