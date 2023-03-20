import styled from "styled-components";
import TextField from "@mui/material/TextField";

const DateBox = styled("div")`
  display: flex;
`;

const DateSingle = styled(TextField)`
  width: 200px;
  margin-left: 10px;
  margin-top: 5px;
`;

const DateRange = styled(TextField)`
  width: 160px;
  margin-left: 10px;
  margin-top: 5px;
`;

export { DateBox, DateSingle, DateRange };
