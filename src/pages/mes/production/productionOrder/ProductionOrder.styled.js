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
  padding: 5px 25px 5px 10px;
  overflow: hidden auto;
`;

export const ContentTop = styled("div")`
  height: 350px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: #ffffff;
  margin-bottom: 10px;
`;
/*
export const ContentTop = styled("div")`
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
*/
export const SearchCondition = styled("div")`
  height: 60px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  background: #ffffff;
  padding: 5px 5px 5px 5px;
  display: flex;
  gap: 10px;
`;
export const ButtonTop = styled("div")`
  padding-top: 5px;
  width: 100%;
  display: flex;
  justify-content: end;

  align-items: center;
`;

export const ContentMid = styled("div")`
  height: 250px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: #ffffff;
  margin-bottom: 10px;
`;

export const ButtonMid = styled("div")`
  padding-top: 5px;
  display: flex;
  align-items: center;
`;
export const TitleMid = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 10px;
  font-family: NotoSansKR_B;
`;

export const ContentBottom = styled("div")`
  height: 600px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: #ffffff;
`;

export const ButtonBottom = styled("div")`
  padding-top: 5px;
  display: flex;
  align-items: end;
`;
export const TitleBottom = styled("div")`
  display: flex;
  width: 100%;
  align-items: center;
  margin-left: 10px;
  font-family: NotoSansKR_B;
`;
export const GridTopWrap = styled("div")`
  height: calc(100% - 45px);
  width: 100%;

  margin-bottom: 8px;
  padding: 10px 10px 10px 10px;
`;
export const GridMidWrap = styled("div")`
  height: calc(100% - 45px);
  width: 100%;
  margin-bottom: 8px;
  padding: 10px 10px 10px 10px;
`;
export const GridBottomWrap = styled("div")`
  height: calc(100% - 45px);
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

export const ButtonWrap = styled("div")`
  width: 100%;
  padding-top: 5px;
  justify-content: end;
  display: flex;
  height: 30px;
  padding-right: 5px;
`;

export const TitleButtonWrap = styled("div")`
  display: flex;
  height: 40px;
`;

export const InnerButtonWrap = styled("div")`
  padding-right: 10px;
`;
export const ComboBox = styled(Autocomplete)`
  width: 250px;
  margin-top: 5px;
`;
