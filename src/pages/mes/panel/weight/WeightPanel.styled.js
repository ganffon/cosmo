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
  padding: 4px 4px 4px 20px;
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
  padding: 5px 20px 5px 10px;
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
  height: 280px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 10px;
`;
export const ButtonBox = styled("div")`
  height: calc(100% - 400px);
  width: 100%;
  display: flex;
  justify-content: space-around;
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

  width: 600px;
  height: 250px;
  padding: 0rem 1rem;
  margin: 5px 0px 0px 10px;

  font-family: "NotoSansKR_B", sans-serif;
  font-size: 10rem;
  color: white;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 10px;
  cursor: pointer;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  transition: 0.5s;

  background: ${(props) => props.color};

  &:hover {
    background: ${(props) => props.hoverColor};
  }
`;
