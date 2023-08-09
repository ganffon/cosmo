import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  height: ${(props) => (props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`)};
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 5px 10px 5px 10px;
  display: flex;
  gap: 10px;
`;
export const ContentsLeft = styled("div")`
  height: 100%;
  width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const ContentsRight = styled("div")`
  height: 100%;
  width: calc(100% - 1000px);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const SearchLeftWrap = styled("div")`
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px;
  background: #ffffff;
`;
export const ContentsHeader = styled("div")`
  height: 100%;
  width: 100%;
  background: #ffffff;
  padding: 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridHeaderWrap = styled("div")`
  height: calc(100% - 50px);
  width: 100%;
  padding: 10px 10px 10px 10px;
`;
export const SearchInfoWrap = styled("div")`
  height: 70px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  padding: 15px;
  gap: 10px;
  background: #ffffff;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const SearchRightWrap = styled("div")`
  height: 100%;
  width: 100%;
  background: #ffffff;
  padding: 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridDetailWrap = styled("div")`
  height: calc(100% - 50px);
  width: 100%;
  padding: 10px 10px 10px 10px;
`;
export const SearchWrap = styled("div")`
  padding: 10px 10px 5px 10px;
  height: 50%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
export const SearchWrapDate = styled("div")`
  height: 100%;
  display: flex;
`;

export const ContentsHeaderWrap = styled("div")`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ButtonBox = styled("div")`
  display: flex;
`;
export const Date = styled(DatePicker)`
  height: 40px;
`;
export const InputS = styled(InputSearch)`
  height: 40px;
`;
export const Title = styled(Typography)`
  width: 50px;
`;

export const Input = styled(TextField)`
  width: 150px;
`;
export const TitleMid = styled("div")`
  display: flex;
  align-items: center;

  margin-left: 10px;
  font-family: NotoSansKR_B;
`;

export const TitleMidLeft = styled("div")`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-top: 5px;
  font-family: NotoSansKR_B;
`;

export const ButtonWrap = styled("div")`
  padding-top: 5px;
  justify-content: end;
  display: flex;
  height: 30px;
  width: 100%;
`;

export const InputPaperWrap = styled("div")`
  display: flex;
  gap: 10px;
`;
export const InnerButtonWrap = styled("div")`
  padding-right: 10px;
`;
