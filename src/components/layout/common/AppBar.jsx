import React, { useContext, useCallback, useState, useEffect } from "react";
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
import { Version } from "Version.js";

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
  // const { isVersionAlert, isSysAlarm } = props;
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
    menuLists = currentMenuName.split("|");
  }

  const [isVersionAlert, setIsVersionAlert] = useState(false);
  const compareVersion = async () => {
    try {
      const result = await restAPI.get(restURI.buildReportLatest);
      const latestVersion = result?.data?.data?.rows[0]?.version; //최신버전
      const historyVersion = Version; // 이전버전
      //현재 Web 버전 보다 BE에 기록된 버전이 최신이라면 Alert Open
      if (latestVersion) {
        if (+latestVersion > +historyVersion) {
          setIsVersionAlert(true);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // const [isSysAlarm, setIsSysAlarm] = useState(false);
  // const [alarmList, setAlarmList] = useState([]);
  // const getSysAlarm = async () => {
  //   try {
  //     const result = await restAPI.get(restURI.sysAlarm);
  //     const list = result?.data?.data?.rows;
  //     setAlarmList(list);
  //     if (list?.length > 0) {
  //       setIsSysAlarm(true);
  //     } else {
  //       setIsSysAlarm(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //   }
  // };

  useEffect(() => {
    compareVersion();
    // getSysAlarm();
    const interval = setInterval(() => {
      compareVersion();
      // getSysAlarm();
    }, 50000); // 5분 마다 버전 비교를 함
    return () => {
      clearInterval(interval);
    };
  }, []);

  // const [alarmIndex, setAlarmIndex] = useState(0);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log("isSysAlarm.alarmList");
  //     console.log(alarmList);
  //     console.log(`index: ${alarmIndex}`);
  //     console.log(`length: ${alarmList.length}`);
  //     setAlarmIndex((prevIndex) => (prevIndex + 1) % alarmList.length);
  //   }, 5000);

  //   return () => clearInterval(timer);
  // }, []);

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
          <S.TextBackground className={"versionAlert"}>
            <S.UserText>
              <S.BuildAlert>{` ※ 현재 구 버전을 사용중입니다. 웹 화면을 새로고침(F5) 해주세요!`}</S.BuildAlert>
            </S.UserText>
          </S.TextBackground>
        )}
        {/* {isSysAlarm && (
          <S.TextBackground className={"sysAlarm"}>
            <S.UserText>
              <S.SysAlarm>{alarmList[0]}</S.SysAlarm>
            </S.UserText>
          </S.TextBackground>
        )} */}
        <S.TextBackground>
          <S.UserText>{`${Cookies.get("userName")}님 환영합니다.`}</S.UserText>
        </S.TextBackground>
        <AvatarButton />
      </S.RightBox>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </S.AppBarBox>
  );
}

export default AppBar;
