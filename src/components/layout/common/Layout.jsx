import React, {
  useState,
  createContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
// ⬇️ reference of page
import AppBar from "./AppBar";
import V2MenuFold from "../v2menu/V2MenuFold";
import ExtendButton from "./ExtendButton";
import * as S from "./Layout.styled";
import { useLocation } from "react-router-dom";
import MenuListDev from "json/MenuListDev.json";

export const LayoutContext = createContext();

const Layout = ({ children }) => {
  const [superAdmin, setSuperAdmin] = useState(true); //🔸false로 바꾸면 메뉴 권한에 따라 동작하게 됨 ➡️ 개발자 모드는 true 초기값 할당
  const [isMenuSlide, setIsMenuSlide] = useState(true); //🔸메뉴 확장, 축소 Flag
  const [isMouseOver, setIsMouseOver] = useState(false); //🔸V2MenuDepth On/Off 상태 Flag
  const [isAllScreen, setIsAllScreen] = useState(false); //🔸전체화면 Flag
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    for (let i = 0; findPath(MenuListDev)[0].length > i; i++) {
      if (
        location.pathname.split("/")[1] === "mes" &&
        location.pathname.split("/")[2] === undefined
      ) {
        window.document.title = `FacdoriOn | Dashboard`;
        break;
      } else {
        if (findPath(MenuListDev)[0][i] === location.pathname.split("/")[2]) {
          window.document.title = `FacdoriOn | ` + findPath(MenuListDev)[1][i];
          const menuName = findPath(MenuListDev)[2][i].split("★");

          if (menuName.length === 2) {
            fullMenuName = menuName[0] + `　|　` + menuName[1];
          } else if (menuName.length === 3) {
            fullMenuName =
              menuName[0] + `　|　` + menuName[1] + `　|　` + menuName[2];
          }
          break;
        }
      }
    }
    setCurrentMenuName(fullMenuName);
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
        }}
      >
        <AppBar />
        <S.MainBox>
          <V2MenuFold />
          <S.ContentsBox id="ContentsBox" isMenuSlide={isMenuSlide}>
            {children}
          </S.ContentsBox>
        </S.MainBox>
        <ExtendButton
          isAllScreen={isAllScreen}
          setIsAllScreen={setIsAllScreen}
        />
      </LayoutContext.Provider>
    </S.LayoutBox>
  );
};

export default Layout;
