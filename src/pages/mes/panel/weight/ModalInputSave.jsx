import React, { useContext, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalInputSave.styled";
import InputPaper from "components/input/InputPaper";

function ModalInputSave(props) {
  const {
    width = "65%",
    height = "50%",
    onClickModalClose = () => {},
    onClickSelect = () => {},
    onClickRemove = () => {},
    onClickSelectStore = () => {},
    onClickRemoveStore = () => {},
    onClickInputSave = () => {},
    onClickNowTime = () => {},
    nowDateTime = {},
    selectInputInfo = {},
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  return (
    <S.ModalWrapBox width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>{currentMenuName}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={onClickModalClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.Content>
        <S.GridTitleBox>
          <div>✳️ 투입정보 확인</div>
          <S.ButtonSet
            color={"#28a745"}
            hoverColor={"#218838"}
            onClick={onClickInputSave}
            width={"150px"}
          >
            Save
          </S.ButtonSet>
        </S.GridTitleBox>
        <S.InfoBox>
          <S.InfoWrap>
            <S.InfoTitle>🔸라인</S.InfoTitle>
            <InputPaper
              width={"150px"}
              height={"60px"}
              nameColor={"black"}
              value={selectInputInfo.lineNM || ""}
              size={"30px"}
              btn={false}
            />
            <S.InfoTitle>🔸품목코드</S.InfoTitle>
            <InputPaper
              width={"300px"}
              height={"60px"}
              nameColor={"black"}
              value={selectInputInfo.prodCD || ""}
              size={"30px"}
              btn={false}
            />
            <S.InfoTitle>🔸품목</S.InfoTitle>
            <InputPaper
              width={"300px"}
              height={"60px"}
              nameColor={"black"}
              value={selectInputInfo.prodNM || ""}
              size={"30px"}
              btn={false}
            />
          </S.InfoWrap>
          <S.InfoWrap>
            <S.InfoTitle>🔸창고 위치</S.InfoTitle>
            <InputPaper
              width={"250px"}
              height={"60px"}
              nameColor={"black"}
              value={selectInputInfo.storeNM || ""}
              size={"30px"}
              btn={false}
            />
            <InputPaper
              width={"250px"}
              height={"60px"}
              nameColor={"black"}
              value={selectInputInfo.locationNM || ""}
              size={"30px"}
              btn={true}
              onClickSelect={onClickSelectStore}
              onClickRemove={onClickRemoveStore}
            />
          </S.InfoWrap>
          <S.InfoWrap>
            <S.InfoTitle>🔸투입자</S.InfoTitle>
            <InputPaper
              width={"250px"}
              height={"60px"}
              nameColor={"black"}
              value={selectInputInfo.empNM || ""}
              size={"30px"}
              btn={true}
              onClickSelect={onClickSelect}
              onClickRemove={onClickRemove}
            />
            <S.InfoTitle>🔸투입일시</S.InfoTitle>
            <InputPaper
              width={"200px"}
              height={"60px"}
              nameColor={"black"}
              value={nowDateTime.nowDate || ""}
              size={"30px"}
              btn={false}
            />
            <InputPaper
              width={"120px"}
              height={"60px"}
              nameColor={"black"}
              value={nowDateTime.nowTime || ""}
              size={"30px"}
              btn={false}
            />
            <S.ButtonTime
              color={"#28a745"}
              hoverColor={"#218838"}
              onClick={onClickNowTime}
              width={"120px"}
            >
              현재시간
            </S.ButtonTime>
          </S.InfoWrap>
        </S.InfoBox>
      </S.Content>
    </S.ModalWrapBox>
  );
}

export default ModalInputSave;
