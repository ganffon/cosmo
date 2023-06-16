import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`};
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 5px 25px 5px 10px;
  overflow: hidden auto;
`;
export const ContentTop = styled("div")`
  height: 400px;
  width: 100%;

  background: #ffffff;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  padding: 5px 5px 5px 5px;
`;

export const SearchCondition = styled("div")`
  height: 60px;
  width: 100%;
  border-radius: 10px;
  background: #ffffff;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;

  padding: 5px 5px 5px 5px;
  display: flex;
`;
export const ButtonTop = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`;
export const ContentMid = styled("div")`
  height: 40px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  padding: 5px 5px 5px 5px;
  display: flex;
  justify-content: space-between;
`;
export const ButtonMid = styled("div")`
  display: flex;
  align-items: center;
`;
export const TitleMid = styled("div")`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-family: NotoSansKR_B;
`;
export const ContentBottom = styled("div")`
  height: 370px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 5px 5px 5px;
  background: #ffffff;
  justify-content: space-between;
`;
export const ButtonBottom = styled("div")`
  display: flex;
  align-items: end;
`;
export const TitleBottom = styled("div")`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-family: NotoSansKR_B;
`;
export const GridTopWrap = styled("div")`
  height: 94%;
  width: 100%;

  margin-bottom: 8px;
  padding: 10px 10px 10px 10px;
`;

export const GridBottomWrap = styled("div")`
  height: 95%;
  width: 100%;

  margin-bottom: 8px;
  padding: 10px 10px 10px 10px;
`;
export const InputS = styled(InputSearch)`
  height: 40px;
`;
export const Date = styled(DatePicker)`
  height: 40px;
`;
export const GridDetailWrap = styled("div")`
  height: calc(100% - 170px);
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-top: 8px;
  padding: 10px 10px 10px 10px;
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

export const InputPaperWrap = styled("div")`
  padding-top: 5px;
  padding-left: 10px;
`;

export const ContentWrap = styled("div")``;
