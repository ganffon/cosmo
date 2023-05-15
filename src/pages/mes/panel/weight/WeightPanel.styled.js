import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`};
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 5px 10px;
  padding: 10px 20px 10px 10px;
  // overflow: hidden auto;
`;

export const ScreenTitleBox = styled("div")`
  height: 40px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 4px 4px 4px 30px;
  font-family: NotoSansKR_B;
  font-size: 20px;
`;
export const SearchBox = styled("div")`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 20px 5px 20px;
`;
export const SearchCondition = styled("div")`
  height: auto;
  width: auto;
  display: flex;
`;
export const SearchButton = styled("div")`
  height: auto;
  width: auto;
  display: flex;
`;
export const GridHeader = styled("div")`
  height: 350px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 20px;
`;
export const GridDetail = styled("div")`
  height: calc(100% - 500px);
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 20px;
`;
