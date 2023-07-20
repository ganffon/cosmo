import styled from "styled-components";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import { Autocomplete } from "@mui/material";

export const InputPaperWrap = styled("div")`
  margin-top: 5px;
`;
export const ButtonWrap = styled("div")`
  width: 100%;
  display: flex;
  justify-content: end;
  padding-top: 5px;
  padding-right: 5px;
`;

export const SearchCondition = styled("div")`
  height: 60px;
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 5px 5px 5px;
  display: flex;
  gap: 10px;
`;
export const ButtonTop = styled("div")`
  padding-top: 10px;
  display: flex;
  align-items: center;
`;
export const ComboBox = styled(Autocomplete)`
  width: 350px;
  margin-top: 5px;
`;

export const TitleButtonWrap = styled("div")`
  height: 50px;
  display: flex;
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
  width: 100%;
  align-items: center;
  margin-left: 10px;
  font-family: NotoSansKR_B;
`;
export const ContentBottom = styled("div")`
  height: 40px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 5px 5px 5px;
  display: flex;
  justify-content: space-between;
`;
export const ButtonBottom = styled("div")`
  display: flex;
  align-items: end;
`;
export const TitleBottom = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 10px;
  font-family: NotoSansKR_B;
`;
export const GridTopWrap = styled("div")`
  height: calc(100% - 50px);
  width: 100%;

  margin-bottom: 8px;
  padding: 10px 10px 10px 10px;
`;

export const GridBottomWrap = styled("div")`
  height: calc(100% - 50px);
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
  height: 500px;
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const ContentsDetail = styled("div")`
  height: calc(100% - 570px);
  width: 100%;
  background: #ffffff;
  align-items: center;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const InnerButtonWrap = styled("div")`
  padding-right: 10px;
`;
