import styled from "styled-components";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

export const PaperBox = styled(Paper)`
  padding: 2px 4px 0px 4px;
  display: flex;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
  margin: 6px 0px 0px 10px;
`;
export const PaperTitle = styled("div")`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: auto;
  height: 20px;
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: ${(props) => props.nameSize};
  color: gray;
`;
export const Text = styled(InputBase)`
  margin-left: 10px;
  flex: 1;
  font-size: ${(props) => props.valueSize};
`;
export const Icon = styled(IconButton)`
  padding: 5px;
`;
