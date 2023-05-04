import styled from "styled-components";
import * as C from "constant/Layout";
import DatePicker from "components/datetime/DatePicker";
import { TextField } from "@mui/material";
import GridSingle from "components/grid/GridSingle";

export const ContentsArea = styled("div")`
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`};
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 5px 10px 5px 10px;
  display: flex;
`;

export const ContentsLeft = styled("div")`
  height: 100%;
  width: 40%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-right: 2.5px;
  padding: 10px 10px 10px 10px;
`;

export const ContentsRight = styled("div")`
  height: 100%;
  width: 60%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-left: 2.5px;
  padding: 10px 10px 10px 10px;
`;
export const SearchLeftWrap = styled("div")`
  height: 110px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 5px 5px 0px;
`;

export const GridHeaderWrap = styled("div")`
  height: 83%;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-top: 10px;
`;
export const Date = styled(DatePicker)`
  height: 40px;
`;

export const InputS = styled(TextField)`
  width: 150px;
`;

export const GridDetailWrap = styled("div")`
  height: 83%;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-top: 10px;
`;

export const ButtonNEDS = styled("div")`
  height: 83%;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-top: 10px;
`;

export const SearchLeftTopWrap = styled("div")`
  height: 50%;
  float: right;
  display: flex;
  align-items: end;
  flex-flow: row wrap;
`;
export const SearchRightTopWrap = styled("div")`
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: end;
  justify-content: end;
  padding: 10px 10px 10px 10px;
`;

export const ButtonNED = styled("div")`
  height: 50%;
  float: right;
  display: flex;
  align-items: end;
  flex-flow: row wrap;
`;
