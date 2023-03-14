import React, { useContext } from "react";
// ⬇️ import MUI
import Filter1 from "@mui/icons-material/Filter1";
import Filter2 from "@mui/icons-material/Filter2";
import Filter3 from "@mui/icons-material/Filter3";
import Filter4 from "@mui/icons-material/Filter4";
// ⬇️ reference of page
import { LayoutEvent } from "../common/Layout";
import * as S from "./V2MenuList.styled";

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
      return <Filter1 sx={{ color: "white" }} />;
  }
};

function V2MenuList(props) {
  const { lv1Menu, setLv2Menu } = props;
  const { changeMouseOver, menuNameChangeSave, setMenuNameChangeSave } =
    useContext(LayoutEvent);
  return (
    <S.MenuList>
      <S.MenuButton
        // onMouseEnter={() => { //🔸메뉴 MouseOver로 동작 시 사용
        onClick={() => {
          changeMouseOver(true);
          lv1Menu.under ? setLv2Menu(lv1Menu.under) : setLv2Menu(null);
          setMenuNameChangeSave({
            ...menuNameChangeSave,
            lv1MenuName: lv1Menu.name,
          });
        }}
      >
        <S.MenuIcon>{menuListIcon(0)}</S.MenuIcon>
        <S.MenuText key={lv1Menu.id} primary={lv1Menu.name} />
      </S.MenuButton>
    </S.MenuList>
  );
}

export default V2MenuList;
