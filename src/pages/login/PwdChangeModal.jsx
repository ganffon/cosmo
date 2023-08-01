import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as S from "./PwdChangeModal.styled";
import NoticeSnack from "components/alert/NoticeSnack";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import restAPI from "api/restAPI";
import Cookies from "js-cookie";

function PwdChangeModal(props) {
  const { onClose = () => {}, refModalGrid = null, isAddOneRow = false, data = [], loginID = "" } = props;
  const [loginInfo, setLoginInfo] = useState({
    loginPW: "",
    loginPWChk: "",
  });
  const changeLoginInfo = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.id]: e.target.value });
  };

  const [alertOpen, setAlertOpen] = useState({
    open: false,
    location: "topCenter",
    message: "비밀번호가 일치하지 않습니다.",
    severity: "error",
  });
  const onPwdChange = (e) => {
    if (loginInfo.loginPW === "") {
      setAlertOpen({
        ...alertOpen,
        open: true,
        location: "topCenter",
        message: "비밀번호를 입력해주세요",
        severity: "error",
      });
    } else if (loginInfo.loginPW !== loginInfo.loginPWChk) {
      setAlertOpen({
        ...alertOpen,
        open: true,
        location: "topCenter",
        message: "비밀번호가 일치하지 않습니다",
        severity: "error",
      });
    } else {
      restAPI
        .patch(`/aut/user/${Cookies.get("userUID")}/password`, {
          password: loginInfo.loginPW,
        })
        .then((response) => {
          setAlertOpen({
            ...alertOpen,
            open: true,
            location: "bottomRight",
            message: "비밀번호 변경 성공!",
            severity: "success",
          });

          // API 응답 데이터 처리 로직
          onClose();
        })
        .catch((error) => {
          // 오류 처리 로직
          setAlertOpen({
            ...alertOpen,
            open: true,
            location: "topCenter",
            message: "비밀번호 변경에 실패했습니다.",
            severity: "success",
          });
          // console.error('API 호출 중 오류 발생:', error);
        })
        .finally(() => {});
    }
  };
  return (
    <ModalWrapMulti width={"60%"} height={"40%"}>
      <S.HeaderBox>
        <S.TitleBox>비밀번호 변경</S.TitleBox>
        {/* <S.ButtonClose color="primary" aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.ButtonClose> */}
      </S.HeaderBox>
      <S.ShadowBoxGrid>
        <S.LoginInput
          id="loginPW"
          label="새 비밀번호"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          size="small"
          onChange={changeLoginInfo}
        />
        <S.LoginInput
          id="loginPWChk"
          label="비밀번호 확인"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          size="small"
          onChange={changeLoginInfo}
        />
        <S.ButtonWrap>
          <S.BtnComponent height={"34px"} width={"110px"} onClick={onPwdChange}>
            <S.SearchTitle>변경</S.SearchTitle>
          </S.BtnComponent>
        </S.ButtonWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={alertOpen} setState={setAlertOpen} />
    </ModalWrapMulti>
  );
}

export default PwdChangeModal;
