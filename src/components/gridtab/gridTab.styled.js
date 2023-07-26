import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const TabGridWrap = styled("div")`
  height: ${(props) => props.height};
  padding: 10px 5px 0px 5px;
`;
const InputNewTab = styled("div")`
  height: 50px;
`;

const TabSingleGridWrap = styled("div")`
  height: 100%;
`;

export { TabGridWrap, InputNewTab, TabSingleGridWrap };
