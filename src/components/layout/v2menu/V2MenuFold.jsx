import React, { useState, useEffect, useContext } from "react";
import V2MenuList from "./V2MenuList.jsx";
import V2MenuDepth from "./V2MenuDepth.jsx";
import MenuListJSON from "json/MenuList.json";
// ⬇️ reference of page
import { LayoutContext } from "../common/Layout";
import * as S from "./V2MenuFold.styled";

function V2MenuFold() {
  const { isMenuSlide, setIsMenuSlide, isAllScreen } =
    useContext(LayoutContext);
  const [lv2Menu, setLv2Menu] = useState(null);

  useEffect(() => {
    if (isAllScreen === true) {
      setIsMenuSlide(false);
    } else {
      setIsMenuSlide(true);
    }
  }, [isAllScreen]);

  return (
    <S.MenuFold isMenuSlide={isMenuSlide}>
      <S.Drawer>
        {MenuListJSON.map((lv1Menu) => (
          <V2MenuList
            key={lv1Menu.id}
            lv1Menu={lv1Menu}
            setLv2Menu={setLv2Menu}
          />
        ))}
      </S.Drawer>
      {isMenuSlide ? (
        <V2MenuDepth lv2Menu={lv2Menu} setLv2Menu={setLv2Menu} />
      ) : null}
    </S.MenuFold>
  );
}

export default V2MenuFold;
