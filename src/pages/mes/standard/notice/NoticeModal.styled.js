import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";
import DatePicker from "../../../../components/datetime/DatePicker";

export const HeaderBox = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  display: flex;
  justify-content: space-between;
  border: solid 1px #e0e0e0;
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const ButtonBox = styled("div")`
  display: flex;
  justify-content: space-between;
  grid-column: 1 / -1;
  grid-row: 2 / 2;
  height: 40px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  align-items: center;
  margin-right: 15px;
  gap: 10px;
`;
export const TitleWrap = styled("div")`
  display: flex;
  align-items: center;
  margin-left: 15px;
  font-family: NotoSansKR_B;
`;


export const TitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
  font-family: NotoSansKR_B;
`;

export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;

export const ContentTitle= styled("div")`
width:100%;
  padding-left:10px;
`
export const ContentMiddle= styled("div")`
width:100%;
  display: flex;
  grid-row: 4;
padding-top:40px;
`
export const ContentWrap= styled("div")`
  grid-row: 15;
  grid-column: 8;
  height:100%;
`

export const Title = styled("div")`

`
export const Date = styled(DatePicker)`
  height: 40px;
`;
export const DateWrap = styled("div")`
  display: flex;
`;

export const DateTitleWrapStart = styled("div")`
  display: flex;
`;

export const DateTitleWrapEnd = styled("div")`
  display: flex;
`;

export const ContentBottom = styled("div")`
  width:100%;
  display: flex;
  grid-row: 10;
  padding-top:40px;
`;
export const Content = styled("textarea")`
  height: 550px;
  width: 700px;
  margin-left: 10px;
  resize: none;
  font-size: 20px;
  font-family: NotoSansKR;
  background: #ffffff;
  border: 1px solid rgba(217, 217, 217, 1);
  box-shadow: none;
  padding: 20px;
`;
export const buttonWrap = styled("div")`
  width:100%;
  padding-top:10px;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
`;
