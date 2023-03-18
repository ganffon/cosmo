import styled from "styled-components";
import { SEARCH_BAR_HEIGHT } from "constant/Layout";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SearchBarBox = styled("div")`
  height: ${SEARCH_BAR_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ComboBox = styled(Autocomplete)`
  width: 300px;
`;

const TextF = styled(TextField)``;

export { SearchBarBox, ComboBox, TextF };
