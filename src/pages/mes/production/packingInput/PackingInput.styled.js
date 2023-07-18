import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "components/datetime/DatePicker";
import { APP_BAR_HEIGHT, SEARCH_BAR_HEIGHT, HEIGHT_MARGIN } from "constant/Layout";

export const ShadowBoxButton = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
`;
export const SearchWrap = styled("div")`
  display: flex;
`;
export const ComboBox = styled(Autocomplete)`
  width: 180px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const ShadowBoxMain = styled("div")`
  height: calc(100% - 60px);
  width: 100%;
  display: flex;
  gap: 10px;
`;
export const ShadowBoxLeft = styled("div")`
  width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const ShadowBoxLeftTop = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ShadowBoxLeftBottom = styled("div")`
  width: 100%;
  height: calc(100% - 410px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ShadowBoxRight = styled("div")`
  width: calc(100% - 1010px);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const HeaderWrap = styled("div")`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Wrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const AlertImg = styled("img")`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const Title = styled("div")`
  font-family: NotoSansKR_B;
  font-size: 20px;
  padding-left: 10px;
`;
export const SubTitle = styled("div")`
  font-family: NotoSansKR_B;
  font-size: 20px;
  &.alert {
    color: #d55451;
  }
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100% - 60px);
  .redText {
    color: red;
    font-weight: 900;
    font-size: 16px;
  }
  .blueText {
    color: blue;
    font-weight: 900;
    font-size: 16px;
  }
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

export const Date = styled(DatePicker)`
  height: 40px;
`;
