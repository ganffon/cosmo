import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";
import DatePicker from "../../../../components/datetime/DatePicker";

export const HeaderBox = styled("div")`
  display: flex;
  justify-content: space-between;
  border: solid 1px #e0e0e0;
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const ButtonBox = styled("div")`
  display: flex;
  justify-content: space-between;
  height: 40px;
`;
// export const ButtonWrap = styled("div")`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;
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

export const ContentTitle = styled("div")`
  width: 100%;
`;
export const ContentMiddle = styled("div")`
  width: 100%;
  display: flex;
`;
export const ContentWrap = styled("div")`
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
  padding: 40px 20px 20px 20px;
  gap: 20px;
`;

export const Title = styled("div")``;
export const Date = styled(DatePicker)``;
export const DateWrap = styled("div")`
  display: flex;
  margin-left: -10px;
`;

export const ContentBottom = styled("div")`
  height: 850px;
  width: 100%;
  display: flex;
`;
export const Content = styled("textarea")`
  height: 100%;
  width: 700px;
  resize: none;
  font-size: 20px;
  font-family: NotoSansKR;
  background: #ffffff;
  border: 1px solid rgba(217, 217, 217, 1);
  box-shadow: none;
  padding: 20px;
`;
export const ButtonWrap = styled("div")`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-right: 30px;
`;
