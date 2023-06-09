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
  background: ${(props) => (props.readOnly ? "#f7f7f7" : "#ffffff")};
  border: 1px solid rgba(217, 217, 217, 1);
  box-shadow: none;
`;
export const PaperTitle = styled("div")`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: auto;
  height: 20px;
  position: absolute;
  top: ${(props) => props.namePositionTop};
  left: ${(props) => props.namePositionLeft};
  font-family: NotoSansKR;
  font-size: ${(props) => props.nameSize};
  color: ${(props) => props.nameColor};
`;
export const Text = styled(InputBase)`
  margin-left: 10px;
  flex: 1;
  font-size: ${(props) => props.size};
  &.red {
    color: red;
  }
`;
export const Icon = styled(IconButton)`
  padding: 5px;
`;
