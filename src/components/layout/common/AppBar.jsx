import React, { useContext, useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// ⬇️ import MUI
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// ⬇️ reference of page
import Logo from "img/Logo/cosmo.png";
import AvatarButton from "./AvatarButton";
import { LayoutContext } from "./Layout";
import * as S from "./AppBar.styled";

function AppBar() {
  const {
    isMenuSlide,
    setIsMenuSlide,
    setIsMouseOver,
    currentMenuName,
    setCurrentMenuName,
    isAllScreen,
  } = useContext(LayoutContext);
  const navigate = useNavigate();
  const gotoDashboard = useCallback(() => {
    navigate("/mes");
    setCurrentMenuName("Dashboard");
  }, []);

  const VERSION = process.env.REACT_APP_VERSION;
  const BASEURI = process.env.REACT_APP_BASE_URL;
  const NEWTAB = process.env.REACT_APP_NEW_TAB_URL;

  return (
    <S.AppBarBox isAllScreen={isAllScreen}>
      <S.LeftBox>
        <IconButton
          color="default"
          aria-label="open drawer"
          onClick={() => {
            setIsMenuSlide(!isMenuSlide);
            setIsMouseOver(false);
          }}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <S.Logo id="mainLogo" src={Logo} onClick={gotoDashboard} />
        <S.MenuTitle>{currentMenuName}</S.MenuTitle>
      </S.LeftBox>
      <S.RightBox>
        <S.UserText>
          {
            // BASEURI +
            //   " ｜ " +
            //   NEWTAB +
            //   " ｜ " +
            //   (VERSION === undefined ? "" : VERSION) +
            Cookies.get("userName")
          }
          님 환영합니다.
        </S.UserText>
        <AvatarButton />
      </S.RightBox>
    </S.AppBarBox>
  );
}

export default AppBar;
