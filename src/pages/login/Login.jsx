import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// ⬇️ reference of page
import Clock from "./Clock";
import Logo from "img/Logo/cosmo.png";
import LogoIspark from "img/Logo/ispark_gray.png";
import NoticeSnack from "components/alert/NoticeSnack";
import * as S from "./Login.styled";
import TextField from "@mui/material/TextField";
import restAPI from "api/restAPI";
import restURI from "api/restURI.json";

function Login() {
  const [cookie, setCookie, removeCookie] = useCookies();

  const [loginInfo, setLoginInfo] = useState({
    loginFactoryID: "",
    loginFactoryName: "",
    loginID: cookie.loginID,
    loginPW: "",
  });
  const [alertOpen, setAlertOpen] = useState({
    open: false,
    location: "bottomLeft",
    message: "로그인 정보가 일치하지 않습니다.",
    severity: "error",
  });
  const [factoryDataOption, setFactoryDataOption] = useState([]);
  useEffect(() => {
    async function factoryDataSetting() {
      const data = await restAPI.get(restURI.factory + "/search");
      setFactoryDataOption(data.data.data.rows);
    }
    factoryDataSetting();
  }, []);

  const changeLoginInfo = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();

  const goLogin = () => {
    if ((loginInfo.loginFactoryID !== "") & (loginInfo.loginPW === "1")) {
      const expiresTime = new Date();
      expiresTime.setFullYear(expiresTime.getFullYear() + 1); //🔸쿠키 만료일 로그인 할 때 마다 +1년 해줘서 무제한
      setCookie("loginID", loginInfo.loginID, {
        path: "/",
        expires: expiresTime,
        secure: true,
      });
      setCookie("loginFactoryID", loginInfo.loginFactoryID, {
        path: "/",
        expires: expiresTime,
        secure: true,
      });
      setCookie("loginFactoryName", loginInfo.loginFactoryName, {
        path: "/",
        expires: expiresTime,
        secure: true,
      });
      localStorage.setItem("loginState", true);
      navigate("/mes");
    } else if (loginInfo.loginFactoryID === "") {
      setAlertOpen({
        ...alertOpen,
        open: true,
        message: "사업부를 선택하세요.",
      });
    } else {
      setAlertOpen({
        ...alertOpen,
        open: true,
        message: "로그인 정보가 일치하지 않습니다.",
      });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      goLogin();
    }
  };

  useEffect(() => {
    const state = localStorage.getItem("loginState");
    if (state === "true") {
      //🔸로그인 이미 한 경우
      navigate("/mes");
    } else {
      //🔸로그인 안 한 경우
      //🔸로그인창 ID표시 및 포커스
      const idBox = document.querySelector("#loginID");
      const pwBox = document.querySelector("#loginPW");
      if (cookie.loginID === undefined) {
        idBox.focus();
      } else {
        idBox.value = loginInfo.loginID;
        pwBox.focus();
      }
    }
  }, []);

  return (
    <S.LoginLayout>
      <S.LeftBox>
        <S.LeftTopBox>
          <S.Logo src={Logo} />
          <S.LoginTitle>Manufacturing Execution System Login</S.LoginTitle>
          <S.LoginForm>
            <S.LoginInputBox>
              <S.FactoryCombo
                disablePortal
                disableClearable
                id="factoryCombo"
                size="small"
                key={(option) => option?.factory_id}
                options={factoryDataOption || null}
                getOptionLabel={(option) => option?.factory_nm || ""}
                onChange={(_, newValue) => {
                  setLoginInfo({
                    ...loginInfo,
                    loginFactoryID: newValue?.factory_id,
                    loginFactoryName: newValue?.factory_nm,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label={"사업부"} size="small" />
                )}
              />
              <S.LoginInput
                id="loginID"
                label="ID"
                variant="outlined"
                autoComplete="off"
                size="small"
                onKeyDown={onKeyDown}
                onChange={changeLoginInfo}
              />
              <S.LoginInput
                id="loginPW"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                size="small"
                onKeyDown={onKeyDown}
                onChange={changeLoginInfo}
              />
            </S.LoginInputBox>
            <S.LoginButton
              id="loginBtn"
              variant="contained"
              size="small"
              onClick={goLogin}
            >
              로그인
            </S.LoginButton>
            <NoticeSnack state={alertOpen} setState={setAlertOpen} />
          </S.LoginForm>
        </S.LeftTopBox>
        <S.LeftBottomBox>
          <S.LogoIspark src={LogoIspark} />
        </S.LeftBottomBox>
      </S.LeftBox>
      <S.RightBox>
        <Clock />
      </S.RightBox>
    </S.LoginLayout>
  );
}

export default Login;
