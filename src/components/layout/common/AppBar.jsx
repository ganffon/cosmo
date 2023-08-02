import React, { useContext, useCallback, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
// ⬇️ import MUI
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// ⬇️ reference of page
import Logo from "img/Logo/cosmo.png";
import AvatarButton from "./AvatarButton";
import { LayoutContext } from "./Layout";
import * as S from "./AppBar.styled";

function AppBar() {
  const { isMenuSlide, setIsMenuSlide, setIsMouseOver, currentMenuName, setCurrentMenuName, isAllScreen } =
    useContext(LayoutContext);
  const navigate = useNavigate();
  const gotoDashboard = useCallback(() => {
    navigate("/mes");
    setCurrentMenuName("Dashboard");
  }, []);

  const [activeBookmark, setActiveBookmark] = useState("");
  const onBookmark = (e) => {
    setActiveBookmark("onStar");
  };

  let menuLists = [];
  if (currentMenuName) {
    menuLists = currentMenuName.split("|");
  }

  const location = useLocation();
  console.log(location.pathname);

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
        <S.MenuTitleBox>
          {menuLists.map((page, index) =>
            index + 1 === menuLists.length ? (
              <>
                <S.MenuTitle key={index}>
                  <S.StrongText>{page}</S.StrongText>
                </S.MenuTitle>
                <S.Bookmark onClick={onBookmark} className={activeBookmark}>
                  ★
                </S.Bookmark>
              </>
            ) : (
              <S.MenuBox key={index}>
                <S.MenuTitle>{page}</S.MenuTitle>
                <S.Arrow>▶</S.Arrow>
              </S.MenuBox>
            )
          )}
        </S.MenuTitleBox>
      </S.LeftBox>
      <S.RightBox>
        <S.UserTextBackground>
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
        </S.UserTextBackground>
        <AvatarButton />
      </S.RightBox>
    </S.AppBarBox>
  );
}

export default AppBar;
