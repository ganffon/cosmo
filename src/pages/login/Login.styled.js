import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BackImg from "img/Login/cosmoback.png";

const LoginLayout = styled("div")`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const LeftBox = styled("aside")`
  min-width: 220px;
  width: 220px;
  height: 100vh;
  padding-left: 15px;
  padding-right: 15px;
  background-color: rgb(223, 221, 221);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LeftTopBox = styled("div")``;

const LeftBottomBox = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const RightBox = styled("main")`
  width: 100%;
  height: 100vh;
  background-image: url(${BackImg});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled("img")`
  scale: 1.2;
`;

const LogoIspark = styled("img")`
  width: 50%;
`;

const LoginForm = styled("form")`
  width: 100%;
  display: flex;
  background-color: rgb(223, 221, 221);
`;

const LoginInputBox = styled("div")`
  display: flex;
  flex-direction: column;
`;

const LoginInput = styled(TextField)`
  width: 90%;
  margin-bottom: 10px;
`;

const LoginButton = styled(Button)`
  height: 120px;
  width: 80px;
`;

const LoginTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
`;

export {
  LoginLayout,
  LeftBox,
  LeftTopBox,
  LeftBottomBox,
  RightBox,
  Logo,
  LogoIspark,
  LoginForm,
  LoginInputBox,
  LoginInput,
  LoginButton,
  LoginTitle,
};
