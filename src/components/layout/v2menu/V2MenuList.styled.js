import styled from "styled-components";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MENU_FOLD_WIDTH } from "constant/Layout";

const MenuList = styled(List)``;
const MenuButton = styled(ListItemButton)`
  min-height: 50px;
  display: flex;
  flex-direction: column;
  width: ${MENU_FOLD_WIDTH};
  padding: 0px;
`;

const MenuIcon = styled(ListItemIcon)`
  min-width: 0px;
  justify-content: center;
`;

const MenuText = styled(ListItemText)`
  color: white;
`;
export { MenuList, MenuButton, MenuIcon, MenuText };
