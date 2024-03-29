import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// ⬇️ reference of page
import Clock from "./Clock";
import LogoCompany from "img/Login/cosmo_logo.svg";
import Dori from "img/Login/dori.svg";
import NoticeSnack from "components/alert/NoticeSnack";
import * as S from "./Login.styled";
import TextField from "@mui/material/TextField";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import BackDrop from "components/backdrop/BackDrop";
import Cookies from "js-cookie";
import PwdChangeModal from "./PwdChangeModal";
import BuildHistory from "./BuildHistory";

function Login() {
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isPwdChange, setIsPwdChange] = useState(false);
  const [isBuildHistoryOpen, setIsBuildHistoryOpen] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    loginFactoryID: "",
    loginFactoryName: "",
    loginID: Cookies.get("loginID"),
    loginPW: "",
  });
  const closeModalPrintOpen = () => {
    setIsPwdChange(false);
  };
  const [alertOpen, setAlertOpen] = useState({
    open: false,
    location: "bottomRight",
    message: "로그인 정보가 일치하지 않습니다.",
    severity: "error",
  });
  const [factoryDataOption, setFactoryDataOption] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState([]);
  const [buildDate, setBuildDate] = useState("");

  useEffect(() => {
    async function factoryDataSetting() {
      await restAPI.get(restURI.loginFactory).then((res) => {
        setFactoryDataOption(res?.data?.data?.rows);
        if (Cookies.get("factoryID")) {
          const result = res?.data?.data?.rows.find((factory) => factory.factory_id === Cookies.get("factoryID"));
          setSelectedFactory(result);
          if (result) {
            setLoginInfo({
              ...loginInfo,
              loginFactoryID: result?.factory_id,
              loginFactoryName: result?.factory_nm,
            });
          }
        }
      });
    }
    factoryDataSetting();

    window.document.title = `FacdoriOn`;

    const latestBuildVersion = async () => {
      try {
        setIsBackDrop(true);
        const result = await restAPI.get(restURI.buildReportLatest);
        const version = result?.data?.data?.rows[0]?.version;
        const date =
          version.slice(0, 2) +
          "." +
          version.slice(2, 4) +
          "." +
          version.slice(4, 6) +
          " " +
          version.slice(6, 8) +
          ":" +
          version.slice(8, 10);
        setBuildDate(date);
      } catch (err) {
        console.log(err);
      } finally {
        setIsBackDrop(false);
      }
    };
    latestBuildVersion();
  }, []);

  const setLoginCookie = (cookieID, cookieData, days) => {
    const expires = new Date(); // 현재 시간
    expires.setDate(expires.getDate() + days); // days일 후의 시간을 설정
    Cookies.set(cookieID, cookieData, { expires }); // 쿠키 설정
  };

  const changeLoginInfo = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();
  const nullCheck = () => {
    if (loginInfo.loginFactoryID === "") {
      setAlertOpen({
        ...alertOpen,
        open: true,
        message: "사업부를 선택하세요.",
      });
      return false;
    } else if (loginInfo.loginID === "") {
      setAlertOpen({
        ...alertOpen,
        open: true,
        message: "아이디를 입력하세요.",
      });
      return false;
    } else if (loginInfo.loginPW === "") {
      setAlertOpen({
        ...alertOpen,
        open: true,
        message: "비밀번호를 입력하세요.",
      });
      return false;
    }
    return true;
  };
  const goLogin = async () => {
    if (nullCheck() === true) {
      setIsBackDrop(true);
      await restAPI
        .get(restURI.login + `?factory_id=${loginInfo.loginFactoryID}&id=${loginInfo.loginID}&pwd=${loginInfo.loginPW}`)
        .then((res) => {
          setLoginCookie("userName", res?.data?.data?.rows[0]?.user.user_nm, 7);
          setLoginCookie("userUID", res?.data?.data?.rows[0]?.user.uid, 7);
          setLoginCookie("userFactoryID", res?.data?.data?.rows[0]?.user.user_factory_id, 7);
          setLoginCookie("factoryID", loginInfo.loginFactoryID, 7);
          setLoginCookie("admin", res?.data?.data?.rows[0]?.user.admin_fg, 7);
          if (res?.data?.data?.rows[0]?.user.pwd_fg) {
            setLoginInfo({
              ...loginInfo,
              loginPW: "",
            });

            setAlertOpen({
              ...alertOpen,
              open: true,
              message: "비밀번호 변경이 필요합니다.",
            });

            setIsPwdChange(true);
            return;
          }
          localStorage.setItem("loginState", true);
          navigate("/mes");
        })
        .catch((res) => {
          localStorage.setItem("loginState", false);
          setAlertOpen({
            ...alertOpen,
            open: true,
            message: res?.response?.data?.message,
          });
        })
        .finally(() => {
          setLoginCookie("loginID", loginInfo.loginID, 7);
          // restAPI 헤더 값 추가
          restAPI.defaults.headers = {
            "Content-Type": "application/json; charset=utf-8",
            factory: Cookies.get("factoryID"),
            user: Cookies.get("userUID"),
          };
          setIsBackDrop(false);
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
      if (Cookies.get("userUID")) {
        navigate("/mes");
      } else {
        localStorage.setItem("loginState", false);
        const idBox = document.querySelector("#loginID");
        const pwBox = document.querySelector("#loginPW");
        if (Cookies.get("loginID") === undefined) {
          idBox.focus();
        } else {
          idBox.value = loginInfo.loginID;
          pwBox.focus();
        }
      }
    } else {
      //🔸로그인 안 한 경우
      //🔸로그인창 ID표시 및 포커스
      const idBox = document.querySelector("#loginID");
      const pwBox = document.querySelector("#loginPW");
      if (Cookies.get("loginID") === undefined) {
        idBox.focus();
      } else {
        idBox.value = loginInfo.loginID;
        pwBox.focus();
      }
    }
  }, []);

  return (
    <S.LoginLayout>
      <S.HeaderBox>
        <S.LogoCompany src={LogoCompany} />
      </S.HeaderBox>
      <S.MainBox>
        <S.LeftBox>
          <Clock />
          <S.Welcome>오늘 하루도 활기차게!😄</S.Welcome>
        </S.LeftBox>
        <S.RightBox>
          <S.LoginForm>
            <S.Dori src={Dori}></S.Dori>
            <S.LoginTitle1>Login to FacdoriON</S.LoginTitle1>
            <S.LoginTitle2>반갑습니다.</S.LoginTitle2>
            <S.LoginInputBox>
              <S.FactoryCombo
                disablePortal
                disableClearable
                id="factoryCombo"
                size="small"
                value={selectedFactory}
                key={(option) => option?.factory_id}
                options={factoryDataOption || null}
                getOptionLabel={(option) => option?.factory_nm || ""}
                onChange={(_, newValue) => {
                  const result = factoryDataOption?.find((factory) => factory?.factory_id === newValue?.factory_id);
                  setSelectedFactory(result);
                  setLoginInfo({
                    ...loginInfo,
                    loginFactoryID: newValue?.factory_id,
                    loginFactoryName: newValue?.factory_nm,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={"사업부"} size="small" />}
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
                value={loginInfo.loginPW}
                onKeyDown={onKeyDown}
                onChange={changeLoginInfo}
              />
            </S.LoginInputBox>
            <S.LoginButton id="loginBtn" variant="contained" size="small" onClick={goLogin}>
              로그인
            </S.LoginButton>
            <S.DividingLine />
            <S.BuildWrap>
              <S.BuildText onClick={() => setIsBuildHistoryOpen(true)}>- Build History</S.BuildText>
              <S.BuildDate>{buildDate}</S.BuildDate>
            </S.BuildWrap>
          </S.LoginForm>
        </S.RightBox>
      </S.MainBox>
      <NoticeSnack state={alertOpen} setState={setAlertOpen} />
      <BackDrop isBackDrop={isBackDrop} />
      {isPwdChange && <PwdChangeModal onClose={closeModalPrintOpen} loginID={loginInfo.loginID} />}
      {isBuildHistoryOpen && <BuildHistory onClose={() => setIsBuildHistoryOpen(false)} />}
      <S.BackGroundImg />
    </S.LoginLayout>
  );
}

export default Login;
