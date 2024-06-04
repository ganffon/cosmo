import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import * as C from "constant/Layout";
import { APP_BAR_COLOR } from "constant/Layout";
import IconButton from "@mui/material/IconButton";

export const ContentsArea = styled("div")`
  height: ${(props) => (props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`)};
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 5px 25px 5px 10px;
  // overflow: hidden auto;
`;

export const ContentTop = styled("div")`
  height: 350px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: #ffffff;
  margin-bottom: 10px;
`;

export const InputWrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const InputTitle = styled("div")`
  width: 110px;
  font-size: 0.9rem;
`;
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
  height: calc(100% - 60px - 350px - 20px);
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: #ffffff;
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

export const SelectHeaderBox = styled("div")`
  display: flex;
  justify-content: space-between;
  background-color: ${APP_BAR_COLOR};
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const SelectSearchBox = styled("div")`
  display: flex;
  justify-content: space-between;
  height: 50px;
`;
export const SelectButtonBox = styled("div")`
  display: flex;
  padding: 10px 10px 0px 0px;
`;
export const SelectGridBox = styled("div")`
  width: 100%;
  height: calc(100% - 40px - 50px);
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 0px 10px 10px 10px;
  margin-top: 10px;
`;

export const SelectTitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
`;

export const SelectButtonClose = styled(IconButton)`
  padding-right: 15px;
`;
