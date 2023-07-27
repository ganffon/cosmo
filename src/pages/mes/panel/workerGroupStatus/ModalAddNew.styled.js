import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";
import InputSearch from "components/input/InputSearch";
import { TextField } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export const ModalWrapBox = styled(ModalWrapMulti)`
  display: flex;
  flex-direction: column;
  background-color: ${APP_BAR_COLOR};
  border-radius: 10px 10px 0px 0px;
`;
export const HeaderBox = styled("div")`
  display: flex;
  justify-content: space-between;
  background-color: ${APP_BAR_COLOR};
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;

export const TitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
`;

export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;
export const Content = styled("div")`
  height: calc(100% - 35px);
  display: flex;
  padding: 10px 10px;
  gap: 10px;
`;
export const ContentLeft = styled("div")`
  height: 100%;
  width: 750px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 30px 10px 10px 20px;
`;
export const ContentRight = styled("div")`
  height: 100%;
  width: calc(100% - 750px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: white;
  padding: 20px 10px 10px 20px;
`;
export const GroupWrap = styled("div")`
  height: "70px";
  display: flex;
  gap: 10px;
  &.columnDirection {
    flex-direction: column;
    height: calc(100% - 400px);
  }
`;
export const Title = styled("div")`
  height: 60px;
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
export const GridTitle = styled("div")`
  height: 40px;
  width: 100%;
  font-family: NotoSansKR_B;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  &.alignTop {
    align-items: start;
  }
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
  cursor: pointer;
  text-align: center;

  &:hover {
    border: solid #b4b4b4 1px;
    background: #b4b4b4;
    border-radius: 10px;
    text-decoration: none;

    &.selected {
      background: #ffc314;
      border: solid #337fed 1px;
      font-weight: 900;
    }
  }

  &.selected {
    border: solid #ffb400 1px;
    background: #ffbe0a;
    font-weight: 900;
  }
`;

export const DatePicker = styled(TextField)`
  width: 250px;
  .MuiInputBase-root {
    font-size: 30px;
  }
`;

export const Issue = styled("textarea")`
  height: 150px;
  width: 700px;
  margin-left: 10px;
  resize: none;
  font-size: 20px;
  font-family: NotoSansKR;
  background: #ffffff;
  border: 1px solid rgba(217, 217, 217, 1);
  box-shadow: none;
  padding: 20px;
`;

export const ButtonWrap = styled("div")`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: end;
  gap: 10px;
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100% - 50px);
`;
export const RowsGridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: calc(100% - 40px);
  grid-template-rows: ${(props) => props.Template || "50% 50%"};
  gap: 10px;
`;
