import styled from "styled-components";
import * as C from "constant/Layout";
import { Autocomplete } from "@mui/material";
import InputSearch from "components/input/InputSearch";

export const ContentsArea = styled("div")`
  height: ${(props) => (props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`)};
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 20px 10px 10px;
  // overflow: hidden auto;
`;
export const TopWrap = styled("div")`
  height: 250px;
  width: 100%;
  background-color: #a0adba;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: #ffffff;
  padding: 10px 20px 10px 10px;
`;
export const MidWrap = styled("div")`
  height: calc(100% - 250px);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: #ffffff;
  padding: 10px 20px 10px 20px;
  gap: 10px;
`;
export const BottomWrap = styled("div")`
  height: 30%;
  display: flex;
  flex-direction: column;
`;
export const SearchWrap = styled("div")`
  height: 50px;
  display: flex;
  justify-content: space-between;
`;
export const SearchBox = styled("div")`
  display: flex;
  gap: 10px;
`;
export const ButtonBox = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LeftWrap = styled("div")`
  height: 100%;
  width: calc(100% - 300px);
  font-family: NotoSansKR_B;
  font-size: 20px;
`;

export const RightWrap = styled("div")`
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: NotoSansKR_B;
  font-size: 20px;
`;
export const ReworkChkWrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 60px;
  margin-top: 30px;
  margin-right: 30px;
`;
export const CheckboxContainer = styled("div")`
  width: 25px;
  height: 25px;
`;
export const ReworkChk = styled("input")`
  cursor: pointer;
  width: 100%;
  height: 100%;
  accent-color: #f5329498;
`;
export const ReworkChkTitle = styled("label")`
  font-size: 1.1rem;
`;
export const ScreenTitleBox = styled("div")`
  height: 40px;
  width: 80%;
  padding-left: 10px;
  font-family: NotoSansKR_B;
  font-size: 20px;
`;

export const GridHeader = styled("div")`
  height: calc(100% - 50px);
  width: 100%;
`;
export const GridDetail = styled("div")`
  height: 98%;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: #ffffff;
`;

export const BarcodeBoxWrap = styled("div")`
  margin-top: 15px;
`;

export const ComboBox = styled(Autocomplete)`
  width: 180px;
  margin-top: 5px;
`;

export const InputSearchStyled = styled(InputSearch)`
  margin-left: -2px;
`;
