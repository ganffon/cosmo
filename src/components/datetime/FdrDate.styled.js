import styled from "styled-components";
import TextField from "@mui/material/TextField";

export const DateSingle = styled(TextField)`
  width: ${(props) => props.width}
  
  border: 2px solid rgba(0, 0, 0, 0.2);
`;
