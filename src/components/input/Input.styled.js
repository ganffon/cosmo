import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const InputBox = styled("div")`
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
`;
const Title = styled(Typography)`
  width: 100px;
`;

const Input = styled(TextField)`
  width: 150px;
`;

export { InputBox, Title, Input };
