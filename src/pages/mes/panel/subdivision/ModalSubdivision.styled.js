import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import { MENU_FOLD_WIDTH, APP_BAR_COLOR } from "constant/Layout";
import InputSearch from "components/input/InputSearch";

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
export const GridTopTitleBox = styled("div")`
  display: flex;
  justify-content: start;
  height: 40px;
  padding-left: 15px;
  font-weight: 700;
`;
export const ButtonBox = styled("div")`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  margin: 7px 0px;
  padding: 0px 10px 0px 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridBottomTitleBox = styled("div")`
  width: 100%;
  height: 40px;
  padding-left: 15px;
  font-weight: 700;
  margin: 7px 0px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridBoxTop = styled("div")`
  width: 100%;
  height: calc(100% - 75px);
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 10px;
`;
export const GridBoxBottom = styled("div")`
  width: 100%;
  height: calc(100% - 60px);
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 10px;
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
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;
export const ContentTop = styled("div")`
  height: 500px;
  display: flex;
  flex-direction: column;
`;
export const ContentBottom = styled("div")`
  height: calc(100% - 510px);
  display: flex;
  flex-direction: column;
`;
export const ContentTopLeft = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const ButtonSet = styled("button")`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: ${(props) => props.width};
  height: 40px;
  padding: 0.5rem 1rem;
  margin-left: 10px;
  margin-top: 3px;

  font-family: "NotoSansKR_B", sans-serif;
  font-size: 1rem;
  color: white;
  text-align: center;
  text-decoration: none;

  display: inline-block;

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
export const SearchBox = styled("div")`
  display: flex;
  padding-right: 10px;
`;
export const Input = styled(InputSearch)`
  display: flex;
`;
