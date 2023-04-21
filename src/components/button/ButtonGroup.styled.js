import styled from "styled-components";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import FolderIcon from "@mui/icons-material/Folder";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

export const ButtonWrap = styled(ButtonGroup)`
  margin-left: 5px;
  margin-top: 5px;
`;

export const Buttons = styled(Button)`
  padding: 0px 0px 0px 0px;
  height: 40px;
`;

export const Icon1 = styled(FolderIcon)`
  color: white;
  height: 30px;
`;
export const Icon2 = styled(CancelPresentationIcon)`
  color: white;
  height: 30px;
`;
