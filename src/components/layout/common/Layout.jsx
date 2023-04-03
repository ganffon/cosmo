import React, { useState, createContext } from "react";
// ⬇️ import MUI
import CssBaseline from "@mui/material/CssBaseline";
// ⬇️ reference of page
import AppBar from "./AppBar";
import DrawerSet from "../v1menu/DrawerSet";
import V2MenuFold from "../v2menu/V2MenuFold";
import ExtendButton from "./ExtendButton";
import * as S from "./Layout.styled";
import { MENU_TYPE } from "constant";

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
    read: "",
    create: "",
    update: "",
    delete: "",
  }); //🔸메뉴별 조회, 등록, 수정, 삭제 권한 값 저장

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
        {/* <CssBaseline /> */}
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
