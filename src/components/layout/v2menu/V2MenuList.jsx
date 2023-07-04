import React, { useContext } from "react";
// ⬇️ import MUI
import Filter1 from "@mui/icons-material/Filter1";
import Filter2 from "@mui/icons-material/Filter2";
import Filter3 from "@mui/icons-material/Filter3";
import Filter4 from "@mui/icons-material/Filter4";
// ⬇️ reference of page
import { LayoutContext } from "../common/Layout";
import Admin from "img/Menu/admin.svg";
import Equipment from "img/Menu/equipment.svg";
import Management from "img/Menu/management.svg";
import Material from "img/Menu/material.svg";
import Panel from "img/Menu/panel.svg";
import Production from "img/Menu/production.svg";
import Quality from "img/Menu/quality.svg";
import Standard from "img/Menu/standard.svg";
import Inventory from "img/Menu/inventory.svg";
import Star from "img/Menu/star.svg";
import * as S from "./V2MenuList.styled";

//메뉴 리스트 아이콘 부여
const menuListIcon = (key) => {
  switch (key) {
    case "admin":
      return <S.Icon src={Admin} />;
    case "standard":
      return <S.Icon src={Standard} />;
    case "inventory":
      return <S.Icon src={Inventory} />;
    case "production":
      return <S.Icon src={Production} />;
    case "equipment":
      return <S.Icon src={Equipment} />;
    case "quality":
      return <S.Icon src={Quality} />;
    case "management":
      return <S.Icon src={Management} />;
    case "panel":
      return <S.Icon src={Panel} />;
    default:
      return <S.Icon src={Star} />;
  }
};

function V2MenuList(props) {
  const { lv1Menu, setLv2Menu, setLv1MenuID } = props;
  const { setIsMouseOver, menuNameChangeSave, setMenuNameChangeSave } = useContext(LayoutContext);
  return (
    <S.MenuList>
      <S.MenuButton
        // onMouseEnter={() => { //🔸메뉴 MouseOver로 동작 시 사용
        onClick={() => {
          setIsMouseOver(true);
          lv1Menu.under ? setLv2Menu(lv1Menu.under) : setLv2Menu(null);
          setLv1MenuID(lv1Menu.id);
          setMenuNameChangeSave({
            ...menuNameChangeSave,
            lv1MenuName: lv1Menu.name,
          });
        }}
      >
        <S.MenuIcon>{menuListIcon(lv1Menu.id)}</S.MenuIcon>
        <S.MenuText key={lv1Menu.id} primary={lv1Menu.name} />
      </S.MenuButton>
    </S.MenuList>
  );
}

export default V2MenuList;
