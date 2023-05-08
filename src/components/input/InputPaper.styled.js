import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

export const PaperBox = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: ${(props) => props.width};
  height: 50px;
`;
export const Text = styled(InputBase)`
  margin-left: 10px;
  flex: 1;
`;
export const Icon = styled(IconButton)`
  padding: 5px;
`;
