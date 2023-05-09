import React from "react";
import * as S from "./InputPaper.styled";
import Divider from "@mui/material/Divider";
import FolderIcon from "@mui/icons-material/Folder";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function InputPaper(props) {
  const {
    width = "180px",
    height = "40px",
    id = "",
    name = "",
    nameSize = "13px",
    value = "",
    valueSize = "15px",
    btn = false,
    onKeyDown = () => {},
    onClickSelect = () => {},
    onClickCancel = () => {},
  } = props;
  return (
    <S.PaperBox width={width} height={height}>
      <S.PaperTitle nameSize={nameSize}>{name}</S.PaperTitle>
      <S.Text
        inputProps={{
          readOnly: true,
        }}
        id={id}
        value={value}
        valueSize={valueSize}
        align={"right"}
        onKeyDown={onKeyDown}
      />
      {btn === true ? (
        <>
          <S.Icon>
            <HighlightOffIcon onClick={onClickCancel} />
          </S.Icon>
          <Divider sx={{ height: "70%", m: 0.5 }} orientation="vertical" />
          <S.Icon>
            <FolderIcon onClick={onClickSelect} />
          </S.Icon>
        </>
      ) : null}
    </S.PaperBox>
  );
}

export default InputPaper;
