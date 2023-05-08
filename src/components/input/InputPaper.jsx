import React from "react";
import * as S from "./InputPaper.styled";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

function InputPaper(props) {
  const { width = "260px" } = props;
  return (
    <S.PaperBox width={width}>
      <S.Text
        inputProps={{
          readOnly: true,
        }}
      />
      <S.Icon>
        <FolderIcon />
      </S.Icon>
      <Divider sx={{ height: "70%", m: 0.5 }} orientation="vertical" />
      <S.Icon>
        <CancelPresentationIcon />
      </S.Icon>
    </S.PaperBox>
  );
}

export default InputPaper;
