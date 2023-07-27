import DatePicker from "components/datetime/DatePicker";
import styled from "styled-components";
import { APP_BAR_HEIGHT, SEARCH_BAR_HEIGHT, HEIGHT_MARGIN } from "constant/Layout";
import TextField from "@mui/material/TextField";

export const ComboWrap = styled("div")`
  display: flex;
`;

export const SearchWrap = styled("div")`
  display: flex;
`;
export const InputText = styled(TextField)`
  height: 40px;
  width: 180px;
  margin-left: 10px;
`;
export const ShadowBoxButton = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: ${SEARCH_BAR_HEIGHT} * 3;
  padding: 0px 10px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const Date = styled(DatePicker)`
  height: 40px;
`;
export const InputPaperWrap = styled("div")`
  padding-top: 5px;
  padding-left: 10px;
`;
export const GridTitle = styled("div")``;
export const ButtonTitleWrap = styled("div")`
  display: flex;
  width: 100%;
`;
export const Title = styled("div")`
  font-family: NotoSansKR, Arial;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;
  margin-top: 0px;
  margin-left: 25px;
`;
export const EachToolWrap = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const CntGridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: ${(props) => props.rowTemplate || "50% 50%"};
  border-radius: 10px;
`;
export const ColGridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: ${(props) => props.height || "70%"};
  grid-template-columns: ${(props) => props.rowTemplate || "50% 50%"};
  border-radius: 10px;
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: 100%;
`;
export const ShadowBoxGrid = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: ${(props) =>
    props.isAllScreen ? `calc(100vh - ${APP_BAR_HEIGHT} - 50px)` : `calc(100vh - ${APP_BAR_HEIGHT} - ${SEARCH_BAR_HEIGHT} - 50px)`};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ChartWrap = styled("div")`
  margin-left: 5px;
  height: ${(props) => props.customHeight || "calc(100% - 15px);"};

  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid ${(props) => props.borderColor || "#DEDEDE"};
`;
