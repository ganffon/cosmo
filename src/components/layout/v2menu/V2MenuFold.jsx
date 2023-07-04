import React, { useState, useEffect, useContext, useRef } from "react";
import V2MenuList from "./V2MenuList.jsx";
import V2MenuDepth from "./V2MenuDepth.jsx";
import MenuList from "json/MenuList.json";
import MenuListDev from "json/MenuListDev.json";
// ⬇️ reference of page
import { LayoutContext } from "../common/Layout";
import * as S from "./V2MenuFold.styled";

function V2MenuFold() {
  const { isMenuSlide, setIsMouseOver, setIsMenuSlide, isAllScreen, superAdmin } = useContext(LayoutContext);
  const [lv1MenuID, setLv1MenuID] = useState("");
  const [lv2Menu, setLv2Menu] = useState(null);
  const isRealMenu = JSON.parse(process.env.REACT_APP_MENU);

  useEffect(() => {
    if (isAllScreen === true) {
      setIsMenuSlide(false);
    } else {
      setIsMenuSlide(true);
    }
  }, [isAllScreen]);

  const refMenuHeader = useRef(null);
  const refMenu = useRef(null);

  const handleOutsideClick = (event) => {
    if (refMenuHeader.current && !refMenuHeader.current.contains(event.target)) {
      if (refMenu.current && !refMenu.current.contains(event.target)) {
        setIsMouseOver(false);
        setLv2Menu(null);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <S.MenuFold isMenuSlide={isMenuSlide} ref={refMenuHeader}>
      <S.Drawer>
        {(isRealMenu ? MenuList : MenuListDev).map((lv1Menu) => (
          <V2MenuList key={lv1Menu.id} lv1Menu={lv1Menu} setLv1MenuID={setLv1MenuID} setLv2Menu={setLv2Menu} />
        ))}
      </S.Drawer>
      {isMenuSlide ? (
        <V2MenuDepth refMenu={refMenu} lv2Menu={lv2Menu} lv1MenuID={lv1MenuID} setLv2Menu={setLv2Menu} />
      ) : null}
    </S.MenuFold>
  );
}

export default V2MenuFold;
