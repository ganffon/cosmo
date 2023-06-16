import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";

export const ContentsArea = styled("div")`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 0px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const HeaderBox = styled("div")`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: ${APP_BAR_COLOR};
  border-radius: 10px 10px 0px 0px;
`;
export const GridBox = styled("div")`
  width: 100%;
  height: calc(100% - 130px);

  padding: 5px 10px 10px 10px;
`;

export const TitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
`;

export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;

export const SearchBox = styled("div")`
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 10px 10px 10px;
`;
