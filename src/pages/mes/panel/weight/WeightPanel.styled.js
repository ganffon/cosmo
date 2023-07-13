import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import * as C from "constant/Layout";
import InputPaper from "components/input/InputPaper";
import { Autocomplete } from "@mui/material";
import InputSearch from "components/input/InputSearch";

export const ContentsArea = styled("div")`
  height: ${(props) => (props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`)};
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 5px 10px;
  padding: 10px 20px 10px 10px;
  // overflow: hidden auto;
`;
export const TopWrap = styled("div")`
  height: 50%;
  margin-bottom: 5px;
`;
export const BottomWrap = styled("div")`
  height: 50%;
  display: flex;
  gap: 5px;
`;
export const ComboBox = styled(Autocomplete)`
  width: 180px;
  margin-top: 5px;
`;
export const ScreenTitleBox = styled("div")`
  height: 30px;
  width: 100%;
  margin-bottom: 10px;
  font-family: NotoSansKR_B;
  font-size: 20px;
`;
export const ScreenBottomTitleBox = styled("div")`
  height: 30px;
  width: 100%;
  padding-left: 15px;
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
  background: white;
  padding: 5px 20px 5px 10px;
`;
export const SearchCondition = styled("div")`
  height: auto;
  width: auto;
  display: flex;
  gap: 10px;
`;
export const GridWrap = styled("div")`
  margin-top: 10px;
  height: 85%;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: white;
  padding: 20px;
`;

export const SearchButton = styled("div")`
  height: auto;
  width: auto;
  display: flex;
`;
export const GridHeader = styled("div")`
  height: 90%;
  width: 100%;
`;
export const ContentBottomLeft = styled("div")`
  width: 600px;
  height: 100%;
  display: flex;
  flex-flow: row wrap;

  gap: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 20px 10px 10px 10px;
`;
export const SelectInfo = styled(InputPaper)``;

export const SelectInfoWrap = styled("div")`
  width: 600px;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  margin-left: 10px;
  gap: 20px;

  padding: 20px 10px 10px 10px;
`;

export const ButtonBox = styled("div")`
  height: 100%;
  width: calc(100% - 600px);
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  margin-left: 5px;
  align-items: center;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 10px;
`;
export const ButtonSet = styled("button")`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 500px;
  height: 350px;
  padding: 0rem 1rem;
  margin: 5px 0px 0px 10px;

  font-family: "NotoSansKR_B", sans-serif;
  font-size: 10rem;
  color: white;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 36px;
  cursor: pointer;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  transition: 0.5s;

  background: ${(props) => props.color};

  &:hover {
    background: ${(props) => props.hoverColor};
  }
`;

export const InputSearchStyled = styled(InputSearch)`
  margin-left: -2px;
`;
