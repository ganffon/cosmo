import React from "react";
import * as S from "./InputText.styled";

function InputText(props) {
  const {
    width = "220px",
    height = "60px",
    id = "",
    name = "",
    nameSize = "20px",
    namePosition = "-25px",
    nameColor = "gray",
    // valueSize = "25px",
    refInput = null,
    handleEnter = () => {},
    onChange = () => {},
    value = "",
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
        id={id}
        autoComplete="off"
        value={value}
        // valueSize={valueSize}
        ref={refInput}
        onKeyDown={handleEnter}
        onChange={onChange}
      />
    </S.PaperBox>
  );
}

export default InputText;
