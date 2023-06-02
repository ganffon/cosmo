import styled, { keyframes } from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BackImg from "img/Login/login_bg.png";
import Autocomplete from "@mui/material/Autocomplete";

export const LoginLayout = styled("div")`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
export const BackGroundImg = styled("div")`
  z-index: -999;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background: url(${BackImg}) no-repeat center bottom;
  background-size: 100% 100%;
`;
export const HeaderBox = styled("div")`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: flex-end;
`;
export const LogoCompany = styled("img")`
  height: 60%;
  width: 20%;
  margin-left: 50px;
`;
export const MainBox = styled("div")`
  width: 100%;
  height: 90%;
  display: flex;
`;
export const LeftBox = styled("div")`
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 50px;
`;
export const Welcome = styled("div")`
  font-size: 36px;
  color: white;
  font-family: NotoSansKR_B;
  text-shadow: 2px 0 0 #000, 0 2px 0 #000, -2px 0 0 #000, 0 -2px 0 #000;
  margin-top: 20px;
`;
export const RightBox = styled("div")`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const LoginForm = styled("form")`
  width: 410px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 12px 13px 22px 6px rgb(2 36 86 / 15%);
  padding: 100px 50px 50px 50px;
  position: relative;
`;
export const LoginTitle1 = styled(Typography)`
  font-size: 24px;
  font-family: NotoSansKR_B;
`;
export const LoginTitle2 = styled(Typography)`
  font-size: 18px;
  font-family: NotoSansKR_B;
  margin-bottom: 30px;
`;

export const LoginInputBox = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LoginInput = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
`;

export const LoginButton = styled(Button)`
  height: 40px;
  width: 100%;
`;

export const FactoryCombo = styled(Autocomplete)`
  margin-bottom: 20px;
  width: 100%;
`;

export const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(5px) rotate(-5deg);
  }
  50% {
    transform: translateX(-5px) rotate(5deg);
  }
  75% {
    transform: translateX(5px) rotate(-5deg);
  }
  100% {
    transform: translateX(0);
  }
}`;

export const Dori = styled("img")`
  height: 150px;
  position: absolute;
  top: -80px;
  left: 30px;
  animation: ${shakeAnimation} 1s ease-in-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;
