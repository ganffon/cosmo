import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BackImg from "img/Login/cosmoback.png";
import Autocomplete from "@mui/material/Autocomplete";

export const LoginLayout = styled("div")`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const LeftBox = styled("aside")`
  min-width: 230px;
  width: 230px;
  height: 100vh;
  padding-left: 15px;
  padding-right: 15px;
  background-color: rgb(223, 221, 221);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LeftTopBox = styled("div")`
  width: 100%;
`;

export const LeftBottomBox = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const RightBox = styled("main")`
  width: 100%;
  height: 100vh;
  background-image: url(${BackImg});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled("img")`
  scale: 1.2;
`;

export const LogoIspark = styled("img")`
  width: 50%;
`;

export const LoginForm = styled("form")`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(223, 221, 221);
`;

export const LoginInputBox = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LoginInput = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

export const LoginButton = styled(Button)`
  height: 40px;
  width: 100%;
`;

export const LoginTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
`;

export const FactoryCombo = styled(Autocomplete)`
  margin-bottom: 10px;
  width: 100%;
`;
