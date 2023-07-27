import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

export const SearchWrap = styled("div")`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: white;
  padding: 5px 10px 5px 10px;
`;
export const SearchCondition = styled("div")`
  height: auto;
  width: auto;
  display: flex;
  gap: 10px;
`;
export const SearchButton = styled("div")`
  height: auto;
  width: auto;
  display: flex;
`;
export const ComboBox = styled(Autocomplete)`
  width: 120px;
  margin-top: 5px;
  &.font-size {
    font-size: 30px;
  }
`;
export const ComboBoxItem = styled(TextField)`
  &.font-size {
    font-size: 30px;
  }
`;
export const BottomBox = styled("div")`
  height: calc(100% - 65px);
  width: 100%;
  display: flex;
  gap: 10px;
`;
export const BottomLeftWrap = styled("div")`
  height: 100%;
  width: 500px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export const BottomRightWrap = styled("div")`
  height: 100%;
  width: calc(100% - 505px);
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 10px;
`;
export const ButtonWrap = styled("div")`
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 10px;
`;
export const ChipButtonWrap = styled("div")`
  height: 100%;
  width: 60px;
  display: flex;
  flex-direction: column;

  gap: 10px;
`;
export const GridWrap = styled("div")`
  height: calc(100% - 50px);
  width: 100%;
`;
export const MainWrap = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const TopWrap = styled("div")`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 0px 10px;
`;
export const MidWrap = styled("div")`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  padding: 0px 20px 0px 10px;
  flex-direction: column;
  gap: 10px;
`;
export const BottomWrap = styled("div")`
  width: 100%;
  height: calc(100% - 200px);
  display: flex;
  gap: 10px;
  padding: 20px 20px 0px 10px;
`;
export const Title = styled("div")`
  width: 120px;
  font-family: NotoSansKR_B;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: end;
  margin-right: 10px;
  &.alignTop {
    align-items: start;
  }
`;

export const GroupWrap = styled("div")`
  height: 70px;
  display: flex;
  gap: 10px;
  &.columnDirection {
    flex-direction: column;
    height: calc(100% - 200px);
  }
`;
export const ChipWrap = styled("div")`
  display: flex;
  gap: 10px;
  width: 100%;
  display: flex;
  gap: 10px;
`;
export const workButton = styled("div")`
  background: #828282;
  border-radius: 10px;
  color: black;
  font-family: NotoSansKR;
  font-size: 30px;
  padding: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  border: solid #828282 1px;
  text-decoration: none;
  display: inline-block;
  text-align: center;

  &.selected {
    border: solid #ffb400 1px;
    background: #ffbe0a;
    font-weight: 900;
  }
`;
export const Issue = styled("textarea")`
  height: 100%;
  width: calc(100% - 130px);
  resize: none;
  font-size: 20px;
  font-family: NotoSansKR;
  background: rgba(217, 217, 217, 0.3);
  border: 1px solid rgba(217, 217, 217, 1);
  box-shadow: none;
  padding: 20px;
`;
