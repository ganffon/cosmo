import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const AvatarButton = styled(Avatar)`
  background-color: ${deepOrange[500]};
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: 10px;
`;

export { AvatarButton };
