import React, { useState } from "react";
import * as S from "./NoticeAlertModal.styled";
import ModalWrap from "components/modal/ModalWrap";
import Cancel from "img/Component/button/cancelWhite.svg";

import Delete from "img/Component/button/delete2.svg";

function NoticeAlertModal(props) {
  const {
    textContent = "내용을 입력하세요!",
    textFontSize = "40px",
    isConfirm = false,
    isModify = false,
    isDelete = false,
    isCancel = false,
    title = "알림",
    height = "500px",
    width = "500px",
    fontColor = "#000000",
    confirmColor = null,
    modifyColor = null,
    deleteColor = null,
    cancelColor = null,
    onConfirm = () => {},
    onModify = () => {},
    onDelete = () => {},
    onCancel = () => {},
  } = props;

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  let contentText;

  if (textContent === null) {
    contentText = "내용을 입력하세요";
  } else {
    contentText = textContent;
  }

  return (
    <ModalWrap height={height} width={width}>
      <S.HeaderBox>
        <S.Title size={"15px"}> {title}</S.Title>
      </S.HeaderBox>
      <S.ContentBox>
        <S.Content size={textFontSize} fontColor={fontColor}>
          {textContent}
        </S.Content>
      </S.ContentBox>
      <S.ButtonWrap>
        {isConfirm ? (
          <S.NoticeButton
            backgroundColor={confirmColor ? confirmColor : "#1491ce"}
            fontColor={"#ffffff"}
            onClick={onConfirm}
          >
            확인
          </S.NoticeButton>
        ) : null}
        {isModify ? (
          <S.NoticeButton
            backgroundColor={modifyColor ? modifyColor : "#088A08"}
            fontColor={"#ffffff"}
            onClick={onModify}
          >
            수정
          </S.NoticeButton>
        ) : null}
        {isDelete ? (
          <S.NoticeButton
            backgroundColor={deleteColor ? deleteColor : "#DD3640"}
            fontColor={"#ffffff"}
            onClick={onDelete}
          >
            <S.Icon src={Delete} /> 삭제
          </S.NoticeButton>
        ) : null}
        {isCancel ? (
          <S.NoticeButton
            backgroundColor={cancelColor ? cancelColor : "#1491ce"}
            fontColor={"#ffffff"}
            onClick={onCancel}
          >
            <S.Icon src={Cancel} /> 취소
          </S.NoticeButton>
        ) : null}
      </S.ButtonWrap>
    </ModalWrap>
  );
}
export default NoticeAlertModal;
