import styled from "styled-components";
import TextField from "@mui/material/TextField";

const DatePickerBox = styled("div")`
  display: flex;
`;

const DatePicker1 = styled(TextField)`
  width: 200px;
  margin-left: 10px;
  margin-top: 5px;
`;

const DatePicker2 = styled(TextField)`
  width: 160px;
  margin-left: 10px;
  margin-top: 5px;
`;

export { DatePickerBox, DatePicker1, DatePicker2 };
