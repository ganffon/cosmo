import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`};
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  padding: 10px 20px 10px 10px;
`;
export const ContentsLeft = styled("div")`
  height: 100%;
  width: 43%;
  padding-right: 2.5px;
`;
export const ContentsRight = styled("div")`
  height: 100%;
  width: 57%;
  padding-left: 2.5px;
`;
export const ItemInfoBox = styled("div")`
  height: 30%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 30px 10px 20px;
`;
export const DataInterfaceBox = styled("div")`
  margin-top: 5px;
  height: calc(70% - 5px);
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 5px 10px 10px;
`;
export const ButtonBox = styled("div")`
  height: 50px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 5px;
`;
export const DataHandleBox = styled("div")`
  height: calc(100% - 50px - 5px);
  width: 100%;
  margin-top: 5px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 5px;
`;
export const InputSelectBox = styled("div")`
  width: 370px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  padding: 0px 20px 0px 20px;
`;
export const InputBox = styled("div")`
  width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  padding: 0px 20px 0px 20px;
`;
export const InputBoxLeft = styled("div")`
  height: 100%;
  width: 50%;
`;
export const InputBoxRight = styled("div")`
  height: 100%;
  width: 50%;
`;
export const Input = styled(TextField)`
  width: 200px;
`;
export const Title = styled(Typography)`
  width: 100px;
  font-family: NotoSansKR_B;
  font-size: 15px;
`;
