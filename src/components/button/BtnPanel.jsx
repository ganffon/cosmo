import React, { useState } from "react";
import * as S from "./BtnPanel.styled";

import Search from "img/Component/button/search.svg";
import New from "img/Component/button/new.svg";
import Edit from "img/Component/button/edit.svg";
import Delete from "img/Component/button/delete.svg";

function BtnPanel(props) {
  const {
    btnName = null,
    title = null,
    height = null,
    width = null,
    color = null,
    fontSize = null,
    fontColor = null,
    borderColor = null,
    iconParam = null,
    onClick = () => {},
  } = props;

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  let btnTitle;
  let icon;
  let btnHeight;
  let btnWidth;
  let btnBackground;
  let btnFontSize;
  let btnFontColor;
  let btnBorderColor;
  let btnIconParm;

  if (iconParam === "New") {
    btnIconParm = New;
  } else if (iconParam === "Edit") {
    btnIconParm = Edit;
  } else if (iconParam === "Delete") {
    btnIconParm = Delete;
  } else {
    btnIconParm = null;
  }
  /*
색깔 코드,
파란색 = #1491CE
흰색 = #FFFFFF
빨간색 = #DD3640
검정색 = #555555
*/
  switch (btnName) {
    case "Search":
      icon = Search;
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "93px";
      btnBackground = color ? color : "blue";
      btnFontSize = fontSize ? fontSize : "10px";
      btnFontColor = fontColor ? fontColor : "white";
      btnBorderColor = borderColor ? color : "white";
      break;

    default:
      btnTitle = title ? title : "버튼이름 입력하세요";
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "84px";
      btnBackground = color ? color : "blue";
      btnFontSize = fontSize ? fontSize : "10px";
      btnFontColor = fontColor ? fontColor : "white";
      btnBorderColor = borderColor ? borderColor : "white";
      break;
  }

  return btnName === "Search" ? (
    <S.ButtonPanel
      height={btnHeight}
      width={btnWidth}
      background={btnBackground}
      borderColor={btnBorderColor}
      onClick={() => {
        handleClick();
        onClick();
      }}
      className={isClicked ? "clicked" : ""}
    >
      <S.SearchIcon src={icon} />
      <S.SearchTitle fontSize={btnFontSize} fontColor={btnFontColor}>
        검색
      </S.SearchTitle>
    </S.ButtonPanel>
  ) : btnIconParm ? (
    <S.ButtonPanel
      height={btnHeight}
      width={btnWidth}
      background={btnBackground}
      borderColor={btnBorderColor}
      onClick={() => {
        handleClick();
        onClick();
      }}
      className={isClicked ? "clicked" : ""}
    >
      <S.Icon src={btnIconParm} />
      <S.Title fontSize={btnFontSize} fontColor={btnFontColor}>
        {btnTitle}
      </S.Title>
    </S.ButtonPanel>
  ) : (
    <S.ButtonPanel
      height={btnHeight}
      width={btnWidth}
      background={btnBackground}
      borderColor={btnBorderColor}
      onClick={() => {
        handleClick();
        onClick();
      }}
      className={isClicked ? "clicked" : ""}
    >
      <S.Title fontSize={btnFontSize} fontColor={btnFontColor}>
        {btnTitle}
      </S.Title>
    </S.ButtonPanel>
  );
}

export default BtnPanel;
