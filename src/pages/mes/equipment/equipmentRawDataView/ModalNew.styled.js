import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";

export const HeaderBox = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const ButtonBox = styled("div")`
  display: flex;
  justify-content: space-between;
  grid-column: 1 / -1;
  grid-row: 2 / 2;
  height: 40px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;
export const TitleWrap = styled("div")`
  display: flex;
  align-items: center;
  margin-left: 15px;
  font-family: NotoSansKR_B;
`;
export const GridBox = styled("div")`
  width: 20%;
  height: 100%;
  grid-column: 1 / -1;
  grid-row: 3 / -1;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 0px 10px 10px 10px;
`;

export const TitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
  font-family: NotoSansKR_B;
`;

export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;

export const PartCapaTop = styled.div`
  display: 'flex'; 
  height: 60%;
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 20px;
  margin-left:10px;
  padding: 3px 5px 10px 0px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;
export const LeftBottom = styled("div")`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background-color: #000000
  margin-left: 10px;
  margin-Right:10px;
  margin-top: 20px;
  padding: 0px 15px 15px 15px;
  display: flex;
  
`;

export const GridContainer = styled("div")`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;