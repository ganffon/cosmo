import styled from "styled-components";
import TextField from "@mui/material/TextField";

const InputBox = styled("div")`
  display: flex;
`;

const InputSet = styled(TextField)`
  width: 180px;
  margin-left: 10px;
  margin-top: 5px;
`;

export { InputBox, InputSet };
