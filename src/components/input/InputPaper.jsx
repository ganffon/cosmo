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
    namePosition = "-10px",
    nameColor = "gray",
    value = null,
    // valueSize = "15px",
    btn = false,
    onKeyDown = () => {},
    onClickSelect = () => {},
    onClickRemove = () => {},
  } = props;
  return (
    <S.PaperBox width={width} height={height}>
      <S.PaperTitle
        nameSize={nameSize}
        namePosition={namePosition}
        nameColor={nameColor}
      >
        {name}
      </S.PaperTitle>
      <S.Text
        inputProps={{
          readOnly: true,
        }}
        key={id}
        id={id}
        value={value}
        // valueSize={valueSize}
        onKeyDown={onKeyDown}
      />
      {btn === true ? (
        <>
          <S.Icon onClick={onClickRemove}>
            <HighlightOffIcon />
          </S.Icon>
          <Divider sx={{ height: "70%", m: 0.5 }} orientation="vertical" />
          <S.Icon onClick={onClickSelect}>
            <FolderIcon />
          </S.Icon>
        </>
      ) : null}
    </S.PaperBox>
  );
}

export default InputPaper;
