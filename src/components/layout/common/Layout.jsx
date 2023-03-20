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

export const LayoutEvent = createContext();

const Layout = ({ children }) => {
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

  const changeMenuSlide = (chk) => {
    //🔸메뉴 슬라이드 접기, 펴기 Flag
    setIsMenuSlide(chk);
  };
  const changeMouseOver = (chk) => {
    //🔸Depth 메뉴 활성화 조건인 마우스 오버 확인 Flag
    setIsMouseOver(chk);
  };

  // const [singleGridData, setSingleGridData] = useState(); //🔸singleGridData 받기

  return (
    <S.LayoutBox>
      <LayoutEvent.Provider
        value={{
          isMenuSlide,
          changeMenuSlide,
          isMouseOver,
          changeMouseOver,
          menuNameChangeSave,
          setMenuNameChangeSave,
          currentMenuName,
          setCurrentMenuName,
          isAllScreen,
          isModalOpen,
          setIsModalOpen,
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
      </LayoutEvent.Provider>
    </S.LayoutBox>
  );
};

export default Layout;
