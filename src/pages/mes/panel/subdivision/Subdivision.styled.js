import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import ButtonGroup from "components/button/ButtonGroup";
import InputPaper from "components/input/InputPaper";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`};
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  gap: 5px 5px;
  padding: 10px 20px 10px 10px;
`;
export const ContentsLeft = styled("div")`
  height: 100%;
  width: 900px;
  display: flex;
  flex-direction: column;
  gap: 10px 10px;
`;
export const ContentsRight = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px 10px;
`;
export const ScreenTitleBox = styled("div")`
  height: auto;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 30px;
  font-family: NotoSansKR_B;
  font-size: 20px;
`;
export const ItemInfoBox = styled("div")`
  height: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px 15px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5% 5% 5% 5%;
`;
export const DataInterfaceBox = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px 15px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5% 5% 5% 5%;
`;
export const DataInterfaceWrap = styled("div")`
  height: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
`;
export const MadeButtonWrap = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 10px;
`;
export const MadeButton = styled("button")`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 120px;
  height: 120px;
  margin: 0;
  padding: 0.5rem 1rem;

  font-family: "NotoSansKR_B", sans-serif;
  font-size: 1.5rem;
  color: white;
  text-align: center;
  text-decoration: none;

  display: inline-block;

  border: none;
  border-radius: 4px;
  cursor: pointer;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  transition: 0.5s;

  background: ${(props) => props.color};

  &:hover {
    background: ${(props) => props.hoverColor};
  }
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
