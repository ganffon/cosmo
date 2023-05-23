import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// ⬇️ import MUI
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
// ⬇️ reference of page
import { LayoutContext } from "../common/Layout";
import { Link } from "react-router-dom";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import NoticeSnack from "components/alert/NoticeSnack";
import Cookies from "js-cookie";
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

function subMenu(
  menu,
  upperMenuName,
  isMouseOver,
  handleClickMenu,
  handleMouseDown
) {
  let result;

  if (menu === null) {
    return null;
  } else {
    result = (
      <S.MenuItem key={menu.id}>
        <S.MenuButton
          onMouseDown={(e) =>
            handleClickMenu(menu, upperMenuName, isMouseOver, e)
          }
        >
          <S.MenuText primary={menu.name} />
        </S.MenuButton>
      </S.MenuItem>
    );
    return result;
  }
}

function V2MenuDepth({ lv2Menu, setLv2Menu }) {
  const {
    isMouseOver,
    setIsMouseOver,
    menuNameChangeSave,
    setMenuNameChangeSave,
    setCurrentMenuName,
    setIsModalOpen,
    authMenuCode,
    setAuthMenuCode,
    superAdmin,
  } = useContext(LayoutContext);
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState({
    open: false,
  });
  const handleClickMenu = async (menu, upperMenuName, isMouseOver, e) => {
    const loginID = Cookies.get("loginID");
    if (loginID !== "ispark") {
      try {
        const res = await restAPI.get(
          `${restURI.authMenuCheck}?menu_cd=${menu.id}&uid=${Cookies.get(
            "userUID"
          )}&user_factory_id=${Cookies.get("userFactoryID")}`
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
    }
  };

  return (
    <>
      {isMouseOver ? (
        <S.MenuDepthBox
          onMouseLeave={() => {
            setIsMouseOver(false);
            setLv2Menu(null);
          }}
        >
          {/* <CssBaseline /> */}
          {lv2Menu && (
            <S.MenuDepth>
              {lv2Menu.map((lv2Menu) => (
                <S.Menu key={lv2Menu.id} subheader={subTitle(lv2Menu)}>
                  {lv2Menu.under
                    ? lv2Menu.under.map((lv3Menu) =>
                        subMenu(
                          lv3Menu,
                          lv2Menu.name,
                          isMouseOver,
                          handleClickMenu
                        )
                      )
                    : subMenu(
                        lv2Menu,
                        lv2Menu.name,
                        isMouseOver,
                        handleClickMenu
                      )}

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
