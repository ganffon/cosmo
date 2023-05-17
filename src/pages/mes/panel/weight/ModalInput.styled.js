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
export const InfoBox = styled("div")`
  display: flex;
  align-items: center;
  height: 80px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 0px;
  margin-bottom: 10px;
`;
export const InfoTitle = styled("div")`
  font-size: 30px;
  font-weight: 700;
  margin-left: 30px;
`;

export const ButtonBox = styled("div")`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-weight: 700;
  padding: 0px 10px 0px 10px;
`;
export const GridTitleBox = styled("div")`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 10px;
  margin-bottom: 10px;
`;
export const GridBox = styled("div")`
  width: 100%;
  height: calc(100% - 150px);
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
  display: flex;
  height: calc(100% - 35px);
  flex-direction: column;
  padding: 10px 10px;
`;
export const ContentTopLeft = styled("div")`
  width: calc(100% - 230px);
  display: flex;
  flex-direction: column;
`;
export const ItemInfoBox = styled("div")`
  height: 370px;
  width: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 0px 5px;
  background: #415c76;
  margin: 0px 10px;
`;
export const ButtonSet = styled("button")`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: ${(props) => props.width};
  height: 40px;
  padding: 0rem 0rem;

  font-family: "NotoSansKR_B", sans-serif;
  font-size: 1.5rem;
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
export const ButtonTime = styled("button")`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: ${(props) => props.width};
  height: 60px;
  padding: 0.5rem 1rem;
  margin-top: 5px;
  margin-left: 10px;

  font-family: "NotoSansKR_B", sans-serif;
  font-size: 1.2rem;
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
`;
export const Input = styled(InputSearch)`
  display: flex;
`;
