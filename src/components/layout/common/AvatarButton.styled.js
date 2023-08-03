import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

export const AvatarButton = styled(Avatar)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: 10px;
`;
export const Version = styled("div")`
  margin-right: 10px;
  font-size: 12px;
  text-align: right;
`;
export const MenuImg = styled("img")`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  &.bookmarkImg {
    width: 15px;
    height: 15px;
  }
`;
