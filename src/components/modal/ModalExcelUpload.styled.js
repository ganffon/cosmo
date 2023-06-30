import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

export const Title = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
`;

export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;
export const HeaderBox = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  display: flex;
  justify-content: space-between;
  border: solid 1px #e0e0e0;
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const InputPaperWrap = styled("div")`
  padding-top: 5px;
  padding-left: 10px;
`;
export const ToolWrap = styled("div")`
  grid-column: 1 / -1;
  grid-row: 2 / 2;
  display: flex;
  padding-top: 20px;
  justify-content: space-around;
  height: 60px;
`;

export const DragAndDropFile = styled("div")`
  color: #a4a4a4;
  text-align: center;
  width: 100%;
`;

export const DragAndDropFileWrap = styled("div")`
  display: flex;
  align-items: center;
  border: dashed 2px #e0e0e0;
  border-radius: 10px 10px 10px 10px;
  grid-column: 4 / 19;
  grid-row: -3 / 7;
`;
export const IconWrap = styled(IconButton)`
  align-items: top;
  grid-column: 4 / 19;
  grid-row: -3 / 7;
`;
