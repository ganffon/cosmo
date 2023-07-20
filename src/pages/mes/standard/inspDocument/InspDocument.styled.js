import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as C from "constant/Layout";
import InputPaper from "components/input/InputPaper";
import InputSearch from "components/input/InputSearch";

export const ShadowBoxButton = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 10px;
`;
export const ShadowBoxHeader = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 20px 20px 20px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 10px;
`;
export const ShadowBoxInput = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 20px 20px 20px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 10px;
`;
export const ShadowBoxDetail = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: 850px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ShadowBoxButtonHeader = styled("div")`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ShadowBoxButtonDetail = styled("div")`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ShadowBoxInputInfo = styled("div")`
  width: 100%;
  height: 50px;
`;
export const ComboWrap = styled("div")`
  display: flex;
  margin-left: 10px;
  gap: 10px;
`;
export const ComboBox = styled(Autocomplete)`
  width: 180px;
`;
export const InputPaperBox = styled(InputPaper)`
  margin-top: 5px;
`;
export const SearchWrap = styled("div")`
  display: flex;
  gap: 10px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 10px;
  height: 40px;
`;
export const GridHeaderWrap = styled("div")`
  width: 100%;
  height: calc(100% - 50px);
`;
export const GridInputWrap = styled("div")`
  width: 100%;
  height: calc(100% - 50px);
`;
export const GridDetailWrap = styled("div")`
  width: 100%;
  height: calc(100% - 100px);
`;
export const InputBox = styled("div")`
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled("div")`
  font-family: NotoSansKR_B;
  font-size: 20px;
`;

export const Search = styled(InputSearch)`
  margin-left: 0px;
  margin-top: 0px;
`;
