import styled from "styled-components";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

export const PaperBox = styled(Paper)`
  padding: 2px 4px 0px 4px;
  display: flex;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
  margin: 6px 0px 0px 10px;
`;
export const Text = styled(InputBase)`
  margin-left: 10px;
  flex: 1;
  // font-size: ${(props) => props.valueSize};
  font-size: 20px;
`;
export const PaperTitle = styled("div")`
  display: flex;
  align-items: center;
  width: auto;
  height: 20px;
  position: absolute;
  top: ${(props) => props.namePosition};
  left: 15px;
  font-family: NotoSansKR_B;
  font-size: ${(props) => props.nameSize};
  color: ${(props) => props.nameColor};
`;
