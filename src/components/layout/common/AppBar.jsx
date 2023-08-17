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
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import NoticeSnack from "components/alert/NoticeSnack";

import GetBookmarkList from "custom/GetBookmarkList";

function AppBar(props) {
  const {
    isMenuSlide,
    setIsMenuSlide,
    setIsMouseOver,
    currentMenuName,
    setCurrentMenuName,
    isAllScreen,
    activeBookmark,
    setActiveBookmark,
    bookmarkList,
    setBookmarkList,
  } = useContext(LayoutContext);
  const { isVersionAlert } = props;
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const navigate = useNavigate();
  const gotoDashboard = useCallback(() => {
    navigate("/mes");
    setCurrentMenuName("Dashboard");
  }, []);
  const location = useLocation();
  const locationLength = location.pathname.split("/").length - 1;
  const menuKey = location.pathname.split("/")[locationLength];

  const getBookmark = async () => {
    try {
      const result = await restAPI.get(restURI.bookmark + `?&uid=${Cookies.get("userUID")}`);
      const data = result?.data?.data?.rows;
      const list = GetBookmarkList(data);
      setBookmarkList(list);
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
    }
  };

  const onBookmark = async (e) => {
    switch (activeBookmark) {
      case "onBookmark":
        try {
          const data = { menu_key: menuKey };
          await restAPI.delete(restURI.bookmark, { data });
          setActiveBookmark("");
          getBookmark();

          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: "즐겨찾기 해제",
            severity: "success",
            location: "bottomRight",
          });
        } catch (err) {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: err?.response?.data?.message,
            severity: "error",
            location: "bottomRight",
          });
        } finally {
        }
        break;
      default:
        try {
          await restAPI.post(restURI.bookmark, { menu_key: menuKey });
          setActiveBookmark("onBookmark");
          getBookmark();
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: "즐겨찾기 등록",
            severity: "success",
            location: "bottomRight",
          });
        } catch (err) {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: err?.response?.data?.message,
            severity: "error",
            location: "bottomRight",
          });
        } finally {
        }
    }
  };

  let menuLists = [];
  if (currentMenuName) {
    menuLists = currentMenuName.split("/");
  }

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
              <S.MenuBox key={index}>
                <S.MenuTitle>
                  <S.StrongText>{page}</S.StrongText>
                </S.MenuTitle>

                {page !== "Dashboard" && (
                  <S.Bookmark onClick={onBookmark} className={activeBookmark}>
                    ★
                  </S.Bookmark>
                )}
              </S.MenuBox>
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
        {isVersionAlert && (
          <S.UserTextBackground className={"pink"}>
            <S.UserText>
              <S.BuildAlert>{` ※ 현재 구 버전을 사용중입니다. 웹 화면을 새로고침(F5) 해주세요!`}</S.BuildAlert>
            </S.UserText>
          </S.UserTextBackground>
        )}
        <S.UserTextBackground>
          <S.UserText>{`${Cookies.get("userName")}님 환영합니다.`}</S.UserText>
        </S.UserTextBackground>
        <AvatarButton />
      </S.RightBox>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </S.AppBarBox>
  );
}

export default AppBar;
