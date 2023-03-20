import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// ⬇️ import MUI
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
// ⬇️ reference of page
import { LayoutEvent } from "../common/Layout";
import * as S from "./V2MenuDepth.styled";

function subTitle(lv2Menu) {
  let result;
  if (lv2Menu.under === null) {
    return null;
  } else {
    result = <S.MenuSubheader>{lv2Menu.name}</S.MenuSubheader>;
    return result;
  }
}

function subMenu(menu, upperMenuName, isMouseOver, handleClickMenu) {
  let result;

  if (menu === null) {
    return null;
  } else {
    result = (
      <S.MenuItem key={menu.id} isMouseOver={isMouseOver}>
        <S.MenuButton
          onClick={() => handleClickMenu(menu, upperMenuName, isMouseOver)}
          isMouseOver={isMouseOver}
        >
          <S.MenuText primary={menu.name} isMouseOver={isMouseOver} />
        </S.MenuButton>
      </S.MenuItem>
    );
    return result;
  }
}

function V2MenuDepth({ lv2Menu, setLv2Menu }) {
  const {
    isMouseOver,
    changeMouseOver,
    menuNameChangeSave,
    setMenuNameChangeSave,
    setCurrentMenuName,
    setIsModalOpen,
  } = useContext(LayoutEvent);
  const navigate = useNavigate();

  const handleClickMenu = (menu, upperMenuName, isMouseOver) => {
    if (isMouseOver === true) {
      setMenuNameChangeSave({
        ...menuNameChangeSave,
        lv2MenuName: upperMenuName,
        lv3MenuName: menu.name,
      });
      /**
       *📌setMenuNameChangeSave 으로 lv2MenuName, lv3MenuName의 state를 변경했지만
       *📌아래에서
       *📌menuNameChangeSave.lv2MenuName 대신 upperMenuName 을
       *📌menuNameChangeSave.lv3MenuName 대신 menu.name 을 사용한 이유를 모르면 공부해!
       */
      if (upperMenuName === menu.name) {
        //🔸AppBar 현재 메뉴 표시
        setCurrentMenuName(
          `${menuNameChangeSave.lv1MenuName} / ${upperMenuName}`
        );
      } else {
        setCurrentMenuName(
          `${menuNameChangeSave.lv1MenuName} / ${upperMenuName} / ${menu.name}`
        );
      }
      setIsModalOpen(false);
      navigate(menu.path);
    }
  };

  return (
    <S.MenuDepthBox
      onMouseLeave={() => {
        changeMouseOver(false);
        setLv2Menu(null);
      }}
      isMouseOver={isMouseOver}
    >
      {/* <CssBaseline /> */}
      {lv2Menu && (
        <S.MenuDepth>
          {lv2Menu.map((lv2Menu) => (
            <S.Menu
              key={lv2Menu.id}
              subheader={subTitle(lv2Menu)}
              isMouseOver={isMouseOver}
            >
              {lv2Menu.under
                ? lv2Menu.under.map((lv3Menu) =>
                    subMenu(lv3Menu, lv2Menu.name, isMouseOver, handleClickMenu)
                  )
                : subMenu(lv2Menu, lv2Menu.name, isMouseOver, handleClickMenu)}

              <Divider />
            </S.Menu>
          ))}
        </S.MenuDepth>
      )}
    </S.MenuDepthBox>
  );
}

export default V2MenuDepth;
