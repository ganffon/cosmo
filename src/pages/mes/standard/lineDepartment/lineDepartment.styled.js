import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "components/datetime/DatePicker";

export const ComboWrap = styled("div")`
  display: flex;
`;
export const ComboBox = styled(Autocomplete)`
  margin-top: 5px;
  margin-left: 10px;
  width: 180px;
`;
export const Date = styled(DatePicker)`
  height: 40px;
`;
