import styled from "styled-components";
import { MENU_FOLD_WIDTH, MENU_FOLD_BACK_COLOR } from "constant/Layout";

const MenuFold = styled("nav")`
  width: ${MENU_FOLD_WIDTH};
  background-color: ${MENU_FOLD_BACK_COLOR};
  display: ${(props) => (props.isMenuSlide ? "flex" : "none")};
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const Drawer = styled("div")`
  background-color: ${MENU_FOLD_BACK_COLOR};
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

export { MenuFold, Drawer };
