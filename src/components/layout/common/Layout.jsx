import React, { useState, createContext, useCallback, useMemo, useEffect } from "react";
// ⬇️ reference of page
import AppBar from "./AppBar";
import V2MenuFold from "../v2menu/V2MenuFold";
import ExtendButton from "./ExtendButton";
import * as S from "./Layout.styled";
import { useLocation } from "react-router-dom";
import MenuList from "json/MenuList.json";
import MenuListDev from "json/MenuListDev.json";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import Cookies from "js-cookie";
import GetBookmarkList from "custom/GetBookmarkList";

export const LayoutContext = createContext();

const Layout = ({ children }) => {
  const isRealMenu = JSON.parse(process.env.REACT_APP_MENU);
  const [superAdmin, setSuperAdmin] = useState(true); //🔸false로 바꾸면 메뉴 권한에 따라 동작하게 됨 ➡️ 개발자 모드는 true 초기값 할당
  const [isMenuSlide, setIsMenuSlide] = useState(true); //🔸메뉴 확장, 축소 Flag
  const [isMouseOver, setIsMouseOver] = useState(false); //🔸V2MenuDepth On/Off 상태 Flag
  const [isAllScreen, setIsAllScreen] = useState(false); //🔸전체화면 Flag
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBookmark, setActiveBookmark] = useState(""); //북마크 On/Off 클래스명 전달
  const [bookmarkList, setBookmarkList] = useState([]); //북마크 List 전달
  const [menuNameChangeSave, setMenuNameChangeSave] = useState({
    lv1MenuName: "",
    lv2MenuName: "",
    lv3MenuName: "",
  }); //🔸메뉴를 선택하기 까지의 레벨별 메뉴이름 저장
  const [currentMenuName, setCurrentMenuName] = useState("Dashboard"); //🔸현재 선택한 메뉴 이름 표시
  const [authMenuCode, setAuthMenuCode] = useState({
    readOnly: false,
    read: true,
    create: true,
    update: true,
    delete: true,
  }); //🔸메뉴별 조회, 등록, 수정, 삭제 권한 값 저장

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  useEffect(() => {
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
    getBookmark();
  }, []);

  const findPath = (obj) => {
    let fullPath = [];
    let path = [];
    let name = [];
    let lv1Menu;
    let lv2Menu;
    let lv3Menu;
    for (let i = 0; obj.length > i; i++) {
      lv1Menu = obj[i].name;
      for (let j = 0; obj[i].under.length > j; j++) {
        lv2Menu = obj[i].under[j].name;
        if (obj[i].under[j].under === null) {
          path.push(obj[i].under[j].path);
          name.push(obj[i].under[j].name);
          fullPath.push(lv1Menu + "★" + lv2Menu);
        } else {
          for (let k = 0; obj[i].under[j].under.length > k; k++) {
            lv3Menu = obj[i].under[j].under[k].name;
            if (obj[i].under[j].under[k].under === null) {
              path.push(obj[i].under[j].under[k].path);
              name.push(obj[i].under[j].under[k].name);
              fullPath.push(lv1Menu + "★" + lv2Menu + "★" + lv3Menu);
            }
          }
        }
      }
    }
    return [path, name, fullPath];
  };
  const location = useLocation();
  useEffect(() => {
    let fullMenuName;
    const MenuJSON = isRealMenu ? MenuList : MenuListDev;

    for (let i = 0; findPath(MenuJSON)[0].length > i; i++) {
      if (location.pathname.split("/")[1] === "mes" && location.pathname.split("/")[2] === undefined) {
        window.document.title = `FacdoriOn | Dashboard`;
        if (location.pathname === "/mes") {
          fullMenuName = "Dashboard";
        }
        break;
      } else {
        if (findPath(MenuJSON)[0][i] === location.pathname.split("/")[2]) {
          window.document.title = `FacdoriOn | ` + findPath(MenuJSON)[1][i];
          const menuName = findPath(MenuJSON)[2][i].split("★");

          if (menuName.length === 2) {
            fullMenuName = menuName[0] + `/` + menuName[1];
          } else if (menuName.length === 3) {
            fullMenuName = menuName[0] + `/` + menuName[1] + `/` + menuName[2];
          }
          break;
        }
      }
    }
    setCurrentMenuName(fullMenuName);

    const actBookmark = async (menuPath) => {
      //메뉴 들어올 때 북마크 여부 판별해서 표현
      const result = await restAPI.get(restURI.bookmark + `?menu_key=${menuPath}&uid=${Cookies.get("userUID")}`);
      if (result?.data?.data?.rows[0]) {
        setActiveBookmark("onBookmark");
      } else {
        setActiveBookmark("");
      }
    };

    actBookmark(location.pathname.split("/")[2]);

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

    GetBookmark();
  }, [location.pathname]);

  return (
    <S.LayoutBox>
      <LayoutContext.Provider
        value={{
          isMenuSlide,
          setIsMenuSlide,
          isMouseOver,
          setIsMouseOver,
          menuNameChangeSave,
          setMenuNameChangeSave,
          currentMenuName,
          setCurrentMenuName,
          isAllScreen,
          isModalOpen,
          setIsModalOpen,
          authMenuCode,
          setAuthMenuCode,
          superAdmin,
          activeBookmark,
          setActiveBookmark,
          bookmarkList,
          setBookmarkList,
        }}
      >
        <AppBar />
        <S.MainBox>
          <V2MenuFold />
          <S.ContentsBox id="ContentsBox" isAllScreen={isAllScreen} isMenuSlide={isMenuSlide}>
            {children}
          </S.ContentsBox>
        </S.MainBox>
        <ExtendButton isAllScreen={isAllScreen} setIsAllScreen={setIsAllScreen} />
      </LayoutContext.Provider>
    </S.LayoutBox>
  );
};

export default Layout;
