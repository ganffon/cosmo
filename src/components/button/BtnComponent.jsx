import React, { useEffect, useState } from "react";
import * as S from "./BtnComponent.styled";
import Search from "img/Component/button/search.svg";
import AddRow from "img/Component/button/addRow.svg";
import Cancel from "img/Component/button/cancel.svg";
import CancelRow from "img/Component/button/cancelRow.svg";
import Delete from "img/Component/button/delete.svg";
import Edit from "img/Component/button/edit.svg";
import Mapping from "img/Component/button/mapping.svg";
import New from "img/Component/button/new.svg";
import Ok from "img/Component/button/ok.svg";
import Save from "img/Component/button/save.svg";
import Sync from "img/Component/button/sync.svg";
import TooltipStore from "constant/Tooltip";

function BtnComponent(props) {
  const { btnName, height = null, width = null, onClick = () => {}, toolTipTitle = null } = props;
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {}, []);
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };
  const checkTooltip = (columnName) => {
    const matchingTooltip = Object.values(TooltipStore).find((tooltipItem) => tooltipItem.columnName === columnName);

    if (matchingTooltip) {
      const tooltipContent = matchingTooltip.tooltip;
      return tooltipContent;
    } else {
      return false;
    }
  };
  const hoverout = () => {
    setTooltipVisible(false);
  };

  const hoverButton = (e) => {
    const { nativeEvent } = e;
    setTooltipPosition({
      ...tooltipPosition,
      x: nativeEvent.layerX - 100,
      y: nativeEvent.layerY - 1000,
    });

    const tooltipText = checkTooltip(toolTipTitle);
    if (tooltipText) {
      setTooltipText(tooltipText);
      setTooltipVisible(true);
    }
  };

  let title;
  let icon;
  let btnHeight;
  let btnWidth;

  switch (btnName) {
    case "Search":
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "93px";
      break;
    case "Edit":
      icon = Edit;
      title = "수정";
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "84px";
      break;
    case "New":
      icon = New;
      title = "등록";
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "84px";
      break;
    case "Delete":
      icon = Delete;
      title = "삭제";
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "84px";
      break;
    case "AddRow":
      icon = AddRow;
      title = "행 추가";
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "100px";
      break;
    case "CancelRow":
      icon = CancelRow;
      title = "행 삭제";
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "100px";
      break;
    case "Save":
      icon = Save;
      title = "저장";
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "84px";
      break;
    case "Ok":
      icon = Ok;
      title = "확인";
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "84px";
      break;
    case "Cancel":
      icon = Cancel;
      title = "취소";
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "84px";
      break;
    case "Add":
      icon = New;
      title = "추가";
      btnHeight = height ? height : "60px";
      btnWidth = width ? width : "70px";
      break;
    case "Mapping":
      icon = Mapping;
      title = "데이터 맵핑";
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "125px";
      break;
    case "DataLoad":
      icon = Sync;
      title = "불러오기";
      btnHeight = height ? height : "34px";
      btnWidth = width ? width : "115px";
      break;
    default:
  }
  return btnName === "Search" ? (
    <S.BtnComponent
      onMouseOver={hoverButton}
      height={btnHeight}
      width={btnWidth}
      onClick={() => {
        handleClick();
        onClick();
      }}
      className={isClicked ? "clicked" : ""}
    >
      <S.Icon src={Search} />
      <S.SearchTitle>검색</S.SearchTitle>
    </S.BtnComponent>
  ) : (
    <S.BtnBack
      onMouseOver={btnName === "DataLoad" || btnName === "Mapping" ? hoverButton : null}
      onMouseOut={hoverout}
      height={btnHeight}
      width={btnWidth}
      onClick={() => {
        handleClick();
        onClick();
      }}
      className={isClicked ? "clicked" : ""}
    >
      <S.Icon src={icon} />
      <S.Title>{title}</S.Title>
      {tooltipVisible ? (
        <S.Tooltip x={1530} y={160}>
          <S.TooltipContents>{tooltipText}</S.TooltipContents>
        </S.Tooltip>
      ) : null}
    </S.BtnBack>
  );
}

export default BtnComponent;
