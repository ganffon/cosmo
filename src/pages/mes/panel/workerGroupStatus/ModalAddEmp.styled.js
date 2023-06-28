import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";
import { TextField } from "@mui/material";

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
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  gap: 10px;
`;
export const ContentRight = styled("div")`
  height: 100%;
  width: 50%;
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
  height: 70px;
  display: flex;
  gap: 10px;
  &.columnDirection {
    flex-direction: column;
    height: calc(100% - 500px);
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
  height: calc(100% - 80px);
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
  height: 40px;
  display: flex;
  justify-content: end;
  gap: 10px;
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100% - 45px);
`;
