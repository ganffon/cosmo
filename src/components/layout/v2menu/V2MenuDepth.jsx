import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const hostName = window.location.hostname;
const IPFlag = hostName.split(".")[0];
const BASE_URL = IPFlag === "192" ? process.env.REACT_APP_NEW_TAB_URL_PANEL : process.env.REACT_APP_NEW_TAB_URL;

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
  const { isMouseOver, setIsMouseOver, setIsModalOpen, authMenuCode, setAuthMenuCode, superAdmin } =
    useContext(LayoutContext);
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

  const handleClickMenu = async (menu, e) => {
    e.preventDefault();
    const loginID = Cookies.get("loginID");
    const admin = Cookies.get("admin");
    if (loginID !== "ispark" && admin !== "true") {
      try {
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
