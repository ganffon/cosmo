import { useContext, useState, useEffect, useRef } from "react";
import LoginStateChk from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";

function DayreportSubdivision() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const refGridModalHeader = useRef(null);
  const refGridModalDetail = useRef(null);
  const refGridSelect = useRef(null);
  return <div>D</div>;
}

export default DayreportSubdivision;
