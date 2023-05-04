import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import {
  MENU_DEPTH_WIDTH,
  MENU_DEPTH_BACK_COLOR,
  MENU_FOLD_BACK_COLOR,
  MENU_FOLD_WIDTH,
  APP_BAR_HEIGHT,
} from "constant/Layout";

const MenuItem = styled(ListItem)`
  width: ${MENU_DEPTH_WIDTH};
  padding: 0px 0px;
`;

const MenuButton = styled(ListItemButton)`
  width: ${MENU_DEPTH_WIDTH};
  padding: 4px 10px;
`;

const MenuText = styled(ListItemText)`
  opacity: 1;
  color: #ddf1ff;
  padding-left: 15px;
`;

const MenuSubheader = styled(ListSubheader)`
  background-color: ${MENU_DEPTH_BACK_COLOR};
  font-size: 18px;
  color: white;
  padding: 0px 4px;
  line-height: 30px;
`;

const MenuDepthBox = styled("div")`
  z-index: 2000;
  position: absolute;
  top: ${APP_BAR_HEIGHT};
  left: ${MENU_FOLD_WIDTH};
  overflow: hidden;
  overflow-y: scroll;
  height: ${`calc(100vh - ${APP_BAR_HEIGHT})`};
  background-color: ${MENU_DEPTH_BACK_COLOR};
  width: ${MENU_DEPTH_WIDTH};
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const MenuDepth = styled("div")``;

const Menu = styled(List)`
  background-color: ${MENU_DEPTH_BACK_COLOR};
  width: ${MENU_DEPTH_WIDTH};
  padding: 0px 0px;
`;

export {
  MenuItem,
  MenuButton,
  MenuText,
  MenuSubheader,
  MenuDepthBox,
  MenuDepth,
  Menu,
};
