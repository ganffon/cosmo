import React from "react";
import * as S from "./InputPaper.styled";
import Divider from "@mui/material/Divider";
import FolderIcon from "@mui/icons-material/Folder";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function InputPaper(props) {
  const {
    width = "180px",
    height = "40px",
    id = null,
    name = null,
    nameSize = "13px",
    namePositionTop = "-10px",
    namePositionLeft = "10px",
    nameColor = "gray",
    value = null,
    size = "15px",
    btn = false,
    btnSingle = false,
    onKeyDown = () => {},
    onClickSelect = () => {},
    onClickRemove = () => {},
    readOnly = true,
  } = props;
  return (
    <S.PaperBox width={width} height={height}>
      <S.PaperTitle
        nameSize={nameSize}
        namePositionTop={namePositionTop}
        namePositionLeft={namePositionLeft}
        nameColor={nameColor}
      >
        {name}
      </S.PaperTitle>
      {readOnly ? (
        <S.Text
          inputProps={{
            readOnly: true,
          }}
          key={id}
          id={id}
          value={value}
          size={size}
          onKeyDown={onKeyDown}
        />
      ) : (
        <S.Text
          key={id}
          id={id}
          value={value}
          size={size}
          onKeyDown={onKeyDown}
          autoComplete={"off"}
        />
      )}
      {btn ? (
        btnSingle ? (
          <S.Icon onClick={onClickSelect}>
            <FolderIcon />
          </S.Icon>
        ) : (
          <>
            <S.Icon onClick={onClickRemove}>
              <HighlightOffIcon />
            </S.Icon>
            <Divider sx={{ height: "70%", m: 0.5 }} orientation="vertical" />
            <S.Icon onClick={onClickSelect}>
              <FolderIcon />
            </S.Icon>
          </>
        )
      ) : null}
    </S.PaperBox>
  );
}

export default InputPaper;
