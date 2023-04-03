import React, { useContext } from "react";
// ⬇️ import MUI
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
// ⬇️ reference of page
import MenuList from "./MenuList";
import MenuListJSON from "json/MenuList.json";
import { LayoutContext } from "../common/Layout";

const drawerWidth = 175;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function DrawerSet() {
  const { isMenuSlide } = useContext(LayoutContext);
  return (
    <Drawer
      variant="permanent"
      open={isMenuSlide}
      PaperProps={{
        sx: {
          backgroundColor: "#e3f2fd",
        },
      }}
    >
      <List>
        <DrawerHeader />
        {MenuListJSON.map((menu) => (
          <MenuList key={menu.id} menu={menu} depth={menu.depth} />
        ))}
      </List>
    </Drawer>
  );
}

export default DrawerSet;
