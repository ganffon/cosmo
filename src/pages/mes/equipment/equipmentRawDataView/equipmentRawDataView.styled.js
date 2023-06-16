
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "components/datetime/DatePicker";
import { APP_BAR_HEIGHT, SEARCH_BAR_HEIGHT, HEIGHT_MARGIN } from "constant/Layout";

export const ShadowBoxButton = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: ${SEARCH_BAR_HEIGHT};
  padding: 0px 10px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ToolWrap = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px;
`;
export const SearchWrap = styled("div")`
  display: flex;
`;
export const InputWrap = styled("div")`
  display: flex;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 10px;
  height: 40px;
`;
export const ShadowBoxGrid = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: ${(props) =>
    props.isAllScreen
      ? `calc(100vh - ${APP_BAR_HEIGHT})`
      : `calc(100vh - ${APP_BAR_HEIGHT} - ${SEARCH_BAR_HEIGHT})`};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100%);
  position: relative;
`;
export const GridWrapReport = styled("div")`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ComboWrap = styled("div")`
  display: flex;
  margin-left: 10px;
  margin-top: 5px;
  gap: 10px;
`;
export const GraphButton = styled("button")`
  background-color: #ffffff;
  border: 1px solid #CCCCCC;
  height: 34px;
  width: 84px;
`;
export const ComboBox = styled(Autocomplete)`
  width: 180px;
`;

export const Date = styled(DatePicker)`
  height: 40px;
`;
export const SearchTitle = styled("div")`
  font-family: NotoSansKR;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: #1491CE;
`;
export const BtnComponent = styled("button")`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 6px;
  padding: 5px 20px 5px 20px;
  background: #ffffff;
  border: 1px solid rgba(20, 145, 206, 1);
  gap: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(20, 145, 206, 0.9);
  }
  &.clicked {
    animation: clickEffect 0.3s;

    @keyframes clickEffect {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.97);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;