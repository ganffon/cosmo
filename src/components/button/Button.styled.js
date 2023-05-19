import styled from "styled-components";
import Button from "@mui/material/Button";

export const ButtonSet = styled(Button)`
  margin-right: 10px;
  height: 30px;
  width: ${(props) => (props.width ? props.width : "100px")};
`;
