import styled from "styled-components";
import TextField from "@mui/material/TextField";

const InputBox = styled("div")`
  display: flex;
  align-items: center;
`;

const InputSet = styled(TextField)`
  width: ${(props) => (props.nameLength > 4 ? "230px" : "180px")};
  margin-left: 10px;
`;

export { InputBox, InputSet };
