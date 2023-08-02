import styled from "styled-components";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import * as C from "constant/Layout";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
export const ContentsArea = styled("div")`
  height: ${(props) => (props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`)};
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 5px 25px 5px 10px;
  overflow: hidden auto;
`;
export const ContentTop = styled("div")`
  height: calc(100% - 390px);
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  padding: 5px 5px 10px 5px;
`;
export const InputText = styled(TextField)`
  height: 40px;
  width: 180px;
  margin-left: 10px;
  margin-top: 5px;
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
  gap: 10px;
`;
export const ButtonTop = styled("div")`
  width: 100%;
  height: 60px;
  display: flex;
  padding-right: 10px;
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
  height: 30px;
  align-items: center;
  margin-left: 10px;
  font-family: NotoSansKR_B;
`;
export const ContentBottom = styled("div")`
  height: 350px;
  min-height: 400px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 5px 5px 5px;

  background: #ffffff;
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
  height: calc(100% - 30px);
  width: 100%;

  margin-bottom: 8px;
  padding: 10px 10px 10px 10px;
`;
export const GridBottomWrap = styled("div")`
  height: calc(100% - 35px);
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
`;

export const ContentWrap = styled("div")`
  height: calc(100% - 60px);
  background: #ffffff;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ComboBox = styled(Autocomplete)`
  width: 350px;
  margin-top: 5px;
`;
