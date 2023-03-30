import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// ⬇️ import MUI
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// ⬇️ reference of page
import Logo from "img/Logo/cosmo.png";
import AvatarButton from "./AvatarButton";
import { LayoutEvent } from "./Layout";
import * as S from "./AppBar.styled";

function AppBar() {
  const {
    isMenuSlide,
    setIsMenuSlide,
    setIsMouseOver,
    currentMenuName,
    setCurrentMenuName,
    isAllScreen,
  } = useContext(LayoutEvent);
  const [cookie, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const gotoDashboard = () => {
    navigate("/mes");
    setCurrentMenuName("Dashboard");
  };

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
        <S.UserText>{cookie.name}님 환영합니다.</S.UserText>
        <AvatarButton />
      </S.RightBox>
    </S.AppBarBox>
  );
}

export default AppBar;
