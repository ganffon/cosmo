import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { APP_BAR_HEIGHT, APP_BAR_COLOR } from "constant/Layout";

export const AppBarBox = styled("header")`
  height: ${APP_BAR_HEIGHT};
  width: 100%;
  background: ${APP_BAR_COLOR};
  display: ${(props) => (props.isAllScreen ? "none" : "flex")};
  justify-content: space-between;
  flex-shrink: 0;
  box-shadow: 5px 0px 10px 1px rgba(0, 0, 0, 0.2);
`;

export const LeftBox = styled("div")`
  display: flex;
  margin-left: 20px;
  align-items: center;
`;

export const RightBox = styled("div")`
  display: flex;
  margin-right: 10px;
  align-items: center;
`;

export const Logo = styled("img")`
  margin-bottom: 4px;
  cursor: pointer;
`;

/*
const MenuTitle = styled(Typography)`
  color: black;
`;

const UserText = styled(Typography)`
  font-size: 13px;
  color: black;
  margin-top: 5px;
`;
*/

export const MenuTitleBox = styled(Typography)`
  display: flex;
  & > :last-child {
    font-family: "NotoSansKR";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
  }
`;

export const Arrow = styled("span")`
  display: flex;
  height: 20px;
  font-family: "NotoSansKR";
  font-style: normal;
  font-size: 10px;
  line-height: 20px;
  color: #777777;
`;

export const MenuBox = styled("span")`
  display: flex;
`;

export const MenuTitle = styled("span")`
  height: 20px;
  display: flex;
  font-family: "NotoSansKR";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #777777;
`;

export const UserTextBackground = styled("div")`
  height: 60%;
  background: #d6f1ff;
  border-radius: 5px 0px 5px 5px;
  margin-top: 10px;
  padding-top: 2px;
  padding-left: 10px;
  padding-right: 10px;
`;
export const UserText = styled("div")`
  height: 10px;
  left: 1712px;
  font-family: "NotoSansKR";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;

  color: #333333;
`;
