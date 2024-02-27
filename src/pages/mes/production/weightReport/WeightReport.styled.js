import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  width: 100%;
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`};
  overflow: hidden auto;
  background-color: rgb(255, 255, 255);
  padding: 0px 20px 0px 10px;
`;
export const ShadowBoxButtonHeader = styled("div")`
  background-color: rgb(255, 255, 255);
  width: calc(100% - 0.5rem);
  height: ${C.SEARCH_BAR_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 5px 0px 5px 0px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ComboWrap = styled("div")`
  display: flex;
  aligin-items: center;
  padding: 5px 5px;
  gap: 10px;
`;
export const ComboBox = styled(Autocomplete)`
  width: 180px;
  margin-top: 5px;
  margin-right: -7px;
`;
export const SearchWrap = styled("div")`
  display: flex;
  flex-flow: row wrap;
  gap: 5px 5px;
  padding: 10px 5px 10px 5px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px 5px 0px;
  gap: 10px;
`;
export const GridHeaderWrap = styled("div")`
  width: calc(100% - 0.5rem);
  height: 500px;
  margin-top: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 10px;
`;
export const GridDetailWrap = styled("div")`
  height: calc(100% - 600px);
  background-color: rgb(255, 255, 255);
  width: calc(100% - 0.5rem);
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  margin-top: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 10px;
`;
export const InputBox = styled("div")`
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
`;
export const Title = styled(Typography)`
  width: 100px;
`;

export const Input = styled(TextField)`
  width: 150px;
`;
export const paddingBox = styled("div")`
  height: 100%;
  padding-top: 65px;
`;
export const TopWrap = styled("div")`
  height: 55%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
