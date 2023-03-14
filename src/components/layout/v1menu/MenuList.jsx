import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// ⬇️ import MUI
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Filter1 from "@mui/icons-material/Filter1";
import Filter2 from "@mui/icons-material/Filter2";
import Filter3 from "@mui/icons-material/Filter3";
import Filter4 from "@mui/icons-material/Filter4";
import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// ⬇️ reference of page
import { LayoutEvent } from "../common/Layout";

//메뉴 리스트 아이콘 부여
const menuListIcon = (id) => {
  switch (id) {
    case 100:
      return <Filter1 />;
    case 200:
      return <Filter2 />;
    case 300:
      return <Filter3 />;
    case 400:
      return <Filter4 />;
    default:
      return <Filter1 />;
  }
};

function MenuList({ menu, depth }) {
  const [open, setOpen] = useState(false); //하위 메뉴 오픈
  const { isMenuSlide } = useContext(LayoutEvent);
  const navigate = useNavigate();
  const onClickMenu = () => {
    menu.under ? setOpen(!open) : navigate(menu.path);
  };
  return (
    <>
      <ListItemButton
        onClick={onClickMenu}
        sx={{
          minHeight: 48,
          justifyContent: isMenuSlide ? "initial" : "center",
          pl: depth,
          width: 180,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isMenuSlide ? 1 : "auto",
            justifyContent: "center",
          }}
        >
          {menuListIcon(0)}
          {/* {depth===1 ? menuListIcon(menu.id) : null} */}
        </ListItemIcon>
        <ListItemText
          primary={menu.name}
          sx={{ opacity: isMenuSlide ? 1 : 0 }}
        />
        {!menu.under ? null : open ? (
          <ExpandLess sx={{ opacity: isMenuSlide ? 1 : 0 }} />
        ) : (
          <ExpandMore sx={{ opacity: isMenuSlide ? 1 : 0 }} />
        )}
      </ListItemButton>

      {menu.under && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {menu.under.map((under) => (
            <MenuList key={under.id} menu={under} depth={under.depth} />
          ))}
        </Collapse>
      )}
    </>
    // <Divider />
  );
}

export default MenuList;
