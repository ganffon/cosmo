import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { APP_BAR_HEIGHT, APP_BAR_COLOR } from "constant/Layout";

const AppBarBox = styled("header")`
  height: ${APP_BAR_HEIGHT};
  width: 100%;
  background: ${APP_BAR_COLOR};
  display: ${(props) => (props.isAllScreen ? "none" : "flex")};
  justify-content: space-between;
  flex-shrink: 0;
  box-shadow: 5px 0px 10px 1px rgba(0, 0, 0, 0.2);
`;

const LeftBox = styled("div")`
  display: flex;
  margin-left: 20px;
  align-items: center;
`;

const RightBox = styled("div")`
  display: flex;
  margin-right: 10px;
  align-items: center;
`;

const Logo = styled("img")`
  margin-bottom: 4px;
  cursor: pointer;
`;

const MenuTitle = styled(Typography)`
  color: black;
`;

const UserText = styled(Typography)`
  font-size: 13px;
  color: black;
  margin-top: 5px;
`;
export { AppBarBox, LeftBox, RightBox, Logo, MenuTitle, UserText };
