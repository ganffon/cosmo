import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// ⬇️ import MUI
import Divider from "@mui/material/Divider";
// ⬇️ reference of page
import { LayoutContext } from "../common/Layout";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import NoticeSnack from "components/alert/NoticeSnack";
import Cookies from "js-cookie";
import * as S from "./V2MenuDepth.styled";
import Admin from "img/Menu/admin.svg";
import Equipment from "img/Menu/equipment.svg";
import Management from "img/Menu/management.svg";
import Panel from "img/Menu/panel.svg";
import Production from "img/Menu/production.svg";
import Quality from "img/Menu/quality.svg";
import Standard from "img/Menu/standard.svg";
import Inventory from "img/Menu/inventory.svg";
import Star from "img/Menu/star.svg";
import GetBookmarkList from "custom/GetBookmarkList";

const hostName = window.location.hostname;
const IPFlag = hostName.split(".")[0];
// const BASE_URL = IPFlag === "192" ? process.env.REACT_APP_NEW_TAB_URL_PANEL : process.env.REACT_APP_NEW_TAB_URL;
let BASE_URL;
switch (IPFlag) {
  case "192":
    BASE_URL = process.env.REACT_APP_NEW_TAB_URL_PANEL;
    break;
  case "51":
    BASE_URL = process.env.REACT_APP_NEW_TAB_URL;
    break;
  case "61":
    BASE_URL = process.env.REACT_APP_NEW_TAB_URL;
    break;
  case "localhost":
    BASE_URL = process.env.REACT_APP_NEW_TAB_URL;
    break;
  default:
    BASE_URL = process.env.REACT_APP_NEW_TAB_URL_DOMAIN;
}

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

function V2MenuDepth(props) {
  const { lv2Menu, refMenu, lv1MenuID } = props;
  const {
    isMouseOver,
    setIsMouseOver,
    setIsModalOpen,
    authMenuCode,
    setAuthMenuCode,
    superAdmin,
    activeBookmark,
    setActiveBookmark,
    bookmarkList,
    setBookmarkList,
  } = useContext(LayoutContext);
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState({
    open: false,
  });

  function subTitle(lv2Menu, lv1MenuID) {
    let result;
    if (lv2Menu.under === null) {
      return null;
    } else {
      result = (
        <S.MenuSubheader>
          {menuListIcon(lv1MenuID)}
          <S.MenuSubheaderTitle>{lv2Menu.name}</S.MenuSubheaderTitle>
        </S.MenuSubheader>
      );
      return result;
    }
  }

  function subMenu(menu, handleClickMenu) {
    let result;

    if (menu === null) {
      return null;
    } else {
      result = (
        <S.MenuItem key={menu.id}>
          <S.MenuButton onMouseDown={(e) => handleClickMenu(menu, e)}>
            <S.MenuText primary={"- " + menu.name} />
          </S.MenuButton>
        </S.MenuItem>
      );
      return result;
    }
  }
  const actBookmark = async (menu) => {
    //메뉴 들어올 때 북마크 여부 판별해서 표현
    const result = await restAPI.get(restURI.bookmark + `?menu_key=${menu.id}&uid=${Cookies.get("userUID")}`);
    if (result?.data?.data?.rows[0]) {
      setActiveBookmark("onBookmark");
    } else {
      setActiveBookmark("");
    }

    GetBookmark();
  };

  const GetBookmark = async () => {
    try {
      const result = await restAPI.get(restURI.bookmark + `?&uid=${Cookies.get("userUID")}`);
      const data = result?.data?.data?.rows;
      const list = GetBookmarkList(data);
      setBookmarkList(list);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const handleClickMenu = async (menu, e) => {
    if (localStorage.getItem("loginState") === "false") {
      // 로그아웃 된 상태라면 메뉴 클릭 시 로그인 화면으로 강제 이동
      navigate("/login");
      return;
    }
    e.preventDefault();
    const loginID = Cookies.get("loginID");
    const admin = Cookies.get("admin");
    if (loginID !== "ispark" && admin !== "true") {
      try {
        actBookmark(menu);
        const res = await restAPI.get(
          `${restURI.authMenuCheck}?menu_cd=${menu.id}&uid=${Cookies.get("userUID")}&user_factory_id=${Cookies.get(
            "userFactoryID"
          )}`
        );

        if (res?.data?.data?.rows[0] !== undefined || superAdmin === true) {
          setAuthMenuCode({
            ...authMenuCode,
            readOnly: res?.data?.data?.rows[0]?.read_only_fg,
            read: res?.data?.data?.rows[0]?.auth_read,
            create: res?.data?.data?.rows[0]?.auth_create,
            update: res?.data?.data?.rows[0]?.auth_update,
            delete: res?.data?.data?.rows[0]?.auth_delete,
          });
          setIsModalOpen(false);
          setIsMouseOver(false);
          if (e?.button === 0) {
            navigate(menu.path);
          } else if (e?.button === 1) {
            window.open(BASE_URL + menu.path, "_blank");
          }
        } else {
          setAlertOpen({
            ...alertOpen,
            open: true,
            message: `${menu.name}에 대한 권한이 없습니다.`,
            severity: "error",
          });
        }
      } catch {
        alert("Menu Click => Auth API Err");
      }
    } else {
      actBookmark(menu);
      setAuthMenuCode({
        ...authMenuCode,
        readOnly: false,
        read: true,
        create: true,
        update: true,
        delete: true,
      });
      setIsMouseOver(false);
      setIsModalOpen(false);
      if (e?.button === 0) {
        navigate(menu.path);
      } else if (e?.button === 1) {
        window.open(BASE_URL + menu.path, "_blank");
      }
    }
  };

  return (
    <>
      {isMouseOver ? (
        <S.MenuDepthBox
          // onMouseLeave={() => {
          //   setIsMouseOver(false);
          //   setLv2Menu(null);
          // }}
          ref={refMenu}
        >
          {/* <CssBaseline /> */}
          {lv2Menu && (
            <S.MenuDepth>
              {lv2Menu.map((lv2Menu) => (
                <S.Menu key={lv2Menu.id} subheader={subTitle(lv2Menu, lv1MenuID)}>
                  {lv2Menu.under
                    ? lv2Menu.under.map((lv3Menu) => subMenu(lv3Menu, handleClickMenu))
                    : subMenu(lv2Menu, handleClickMenu)}

                  <Divider />
                </S.Menu>
              ))}
            </S.MenuDepth>
          )}
        </S.MenuDepthBox>
      ) : null}
      <NoticeSnack state={alertOpen} setState={setAlertOpen} />
    </>
  );
}

export default V2MenuDepth;
